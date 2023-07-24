import { Box, Button, Group, ScrollArea, Stack, TextInput, useMantineTheme } from "@mantine/core";
import { useGameTagModalStyles } from "./GameTagModal.styles";
import { useListState } from "@mantine/hooks";
import InvisibleButton from "../../../common/InvisibleButton/InvisibleButton";
import { IconSearch, IconX } from "@tabler/icons-react";
import { ChangeEvent, useState } from "react";
import { showError } from "../../../../utils/notifications";

interface GameTagModalProps {
  onClose?: () => void;
}

function isContain(substring: string, str: string): boolean {
  const lowerCaseSubstring = substring.toLowerCase();
  const lowerCaseStr = str.toLowerCase();
  return lowerCaseStr.includes(lowerCaseSubstring);
}

export function GameTagModal({ onClose }: GameTagModalProps) {
  const { classes, cx } = useGameTagModalStyles();
  const theme = useMantineTheme();

  // 태그 관련
  const data = [
    { label: "React", checked: false },
    { label: "Ng", checked: false },
    { label: "Svelte", checked: false },
    { label: "Vue", checked: false },
    { label: "Riot", checked: false },
    { label: "Next", checked: false },
    { label: "Blitz", checked: false },
    { label: "Python", checked: false },
    { label: "TypeScript", checked: false },
  ];

  const [values, handlers] = useListState(data);
  const [checked, checkedHandler] = useListState<{ label: string; index: number }>([]);

  // 태그 검색 관련
  const [search, setSearch] = useState<string>("");
  const onSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const tags = values.map((value, index) => {
    if (isContain(search, value.label)) {
      return (
        <Button
          className={cx(classes.tagButton, values[index].checked && classes.tagButtonChecked)}
          onClick={() => {
            if (values[index].checked || checked.length <= 7) {
              const checked = !values[index].checked; // 현 태그가 checked 속성 값을 반전
              handlers.setItemProp(index, "checked", checked); // 해당 index의 checked 속성을 checked로 설정

              if (checked)
                checkedHandler.append({
                  label: value.label,
                  index: index,
                });
              // 만약 checked이면 checkHandler에 value.label 추가
              else checkedHandler.filter((item) => item.label !== value.label); // 아니면 checkHandler에서 value.label 제거
            } else {
              showError("태그는 7개까지 추가할 수 있습니다.", null);
            }
          }}
        >
          {value.label}
        </Button>
      );
    }
  });
  const selectedTag = checked.map((value) => (
    <Box className={classes.selectedTag}>
      <Group spacing={"0.3rem"}>
        {value.label}
        <InvisibleButton
          onClick={() => {
            checkedHandler.filter((item) => item !== value);
            handlers.setItemProp(value.index, "checked", false);
          }}
        >
          <IconX stroke={2} size={"0.8rem"} color={theme.colors.blue[6]} />
        </InvisibleButton>
      </Group>
    </Box>
  ));

  return (
    <Stack spacing={"sm"}>
      <Box className={classes.multiSelectBox}>
        <Stack spacing={"0.4rem"}>
          <Group className={classes.searchGroup}>
            <IconSearch stroke={2} size={"1.2rem"} color={theme.colors.gray[6]} />
            <TextInput
              className={classes.search}
              placeholder="원하는 태그를 검색해서 추가해보세요."
              onChange={onSearchChange}
            />
          </Group>
          <Box className={classes.tagBox}>{tags}</Box>
        </Stack>
      </Box>
      <Group spacing={"xs"}>
        <Box className={classes.selectedBox}>{selectedTag}</Box>
        <Button variant="light" color="cyan" onClick={onClose}>
          추가
        </Button>
      </Group>
    </Stack>
  );
}
