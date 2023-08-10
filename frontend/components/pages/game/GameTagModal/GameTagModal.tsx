import { Box, Button, Group, Stack, TextInput, useMantineTheme } from "@mantine/core";
import { useGameTagModalStyles } from "./GameTagModal.styles";
import { useListState } from "@mantine/hooks";
import InvisibleButton from "../../../common/InvisibleButton/InvisibleButton";
import { IconSearch, IconX } from "@tabler/icons-react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { cleanNotification, showError } from "../../../../utils/notifications";
import { useMyGameTag } from "../../../../hooks/game/useMyGameTag";

interface GameTagModalProps {
  onClose?: () => void;
  gameId: string;
}

function isContain(substring: string, str: string): boolean {
  const lowerCaseSubstring = substring.toLowerCase();
  const lowerCaseStr = str.toLowerCase();
  return lowerCaseStr.includes(lowerCaseSubstring);
}

export function GameTagModal({ onClose, gameId }: GameTagModalProps) {
  const { classes, cx } = useGameTagModalStyles();
  const theme = useMantineTheme();

  const { data: myPrevTagData } = useMyGameTag(gameId); // 유저가 이전에 추가해 놓은 태그
  const myPrevTagList = myPrevTagData?.data.map((item) => {
    item.name;
  });

  const [myTagData, setMyTagData] = useState(myPrevTagList); // 현재 유저가 태그해 놓은 태그

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

  // 검색창이 자동 활성화 되도록
  const textInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (textInputRef.current) {
      textInputRef.current.focus();
    }
  }, []);

  const tags = values.map((value, index) => {
    if (isContain(search, value.label)) {
      return (
        <Button
          className={cx(classes.tagButton, values[index].checked && classes.tagButtonChecked)}
          onClick={() => {
            if (values[index].checked || checked.length < 7) {
              const checked = !values[index].checked; // 현 태그가 checked 속성 값을 반전
              handlers.setItemProp(index, "checked", checked); // 해당 index의 checked 속성을 checked로 설정

              if (checked)
                checkedHandler.append({
                  label: value.label,
                  index: index,
                });
              // 만약 checked이면 checkHandler에 value.label 추가
              else checkedHandler.filter((item) => item.label !== value.label);
              // 아니면 checkHandler에서 value.label 제거
              cleanNotification();
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
            checkedHandler.filter((item) => item !== value); // checkHandler에서 value.label 제거
            handlers.setItemProp(value.index, "checked", false); // 해당 index의 checked 속성을 false로 설정
            cleanNotification();
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
              value={search}
              ref={textInputRef}
              rightSection={
                <InvisibleButton
                  onClick={() => {
                    setSearch("");
                    if (textInputRef.current) {
                      textInputRef.current.focus();
                    }
                  }}
                >
                  <IconX stroke={1.5} size={"1rem"} color={theme.colors.gray[5]} />
                </InvisibleButton>
              }
            />
          </Group>
          <Box className={classes.tagBox}>{tags}</Box>
        </Stack>
      </Box>
      <Group spacing={"xs"} className={classes.selectedGroup}>
        <Box className={classes.selectedBox}>{selectedTag}</Box>
        <Button variant="light" color="cyan" h={"2.5rem"} onClick={onClose}>
          추가
        </Button>
      </Group>
    </Stack>
  );
}
