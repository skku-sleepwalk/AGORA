import { Box, Button, Group, Stack, TextInput, useMantineTheme } from "@mantine/core";
import { useGameTagModalStyles } from "./GameTagModal.styles";
import { useFocusTrap } from "@mantine/hooks";
import InvisibleButton from "../../../common/InvisibleButton/InvisibleButton";
import { IconSearch, IconX } from "@tabler/icons-react";
import { useContext, useEffect, useRef, useState } from "react";
import { cleanNotification, showError } from "../../../../utils/notifications";
import { useMyGameTag } from "../../../../hooks/game/useMyGameTag";
import { useGameTagList } from "../../../../hooks/game/useGameTagList";
import { GameTag } from "../../../../types/api/game/gameTag";
import deleteGameTag, { PostGameTag } from "../../../../utils/api/game/gameTag/gameTag";
import useAuth from "../../../../hooks/useAuth";
import { GameContext } from "../../../../pages/game/[id]";

interface GameTagModalProps {
  onClose?: () => void;
  gameId: string;
}

export function GameTagModal({ onClose, gameId }: GameTagModalProps) {
  const { classes, cx } = useGameTagModalStyles();
  const theme = useMantineTheme();
  const { token } = useAuth();

  const { mutatePost } = useContext(GameContext); // 게임 postData mutate 관련

  const { data: myPrevTagData } = useMyGameTag(gameId); // 유저가 이전에 추가해 놓은 태그 (id와 name 둘 다 있음)
  const myPrevTagList: string[] = myPrevTagData
    ? myPrevTagData.data.map((item) => {
        return item.tag.name;
      })
    : [];

  const [myTagData, setMyTagData] = useState<string[]>([...myPrevTagList]); // 현재 유저가 태그해 놓은 태그 (name만 있음)
  useEffect(() => {
    setMyTagData([...myPrevTagList]);
  }, [...myPrevTagList]);

  // 태그 (검색) 관련
  const searchRef = useRef<HTMLInputElement>(null);
  const [search, setSearch] = useState<string>("");
  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      setSearch(searchRef.current ? searchRef.current.value : "");
    } else if (searchRef.current?.value === "") {
      setSearch("");
    }
  };
  const { data: tagData } = useGameTagList(search);

  // 검색창이 자동 활성화 되도록
  const focusTrapRef = useFocusTrap();

  // (검색된) 태그 목록
  const tags = tagData?.data.map((tag: GameTag) => {
    const checked = myTagData?.includes(tag.name);
    return (
      <Button
        className={cx(classes.tagButton, checked && classes.tagButtonChecked)}
        onClick={() => {
          if (checked || myTagData.length < 5) {
            let copyMyTagData = [...myTagData];
            if (checked)
              // 만약 checked이면 현재 유저가 태그해 놓은 태그에서 제거
              myTagData.forEach((value, index) => {
                if (tag.name === value) {
                  copyMyTagData.splice(index, 1); // index 부터 1개의 요소를 제거
                  setMyTagData(copyMyTagData);
                }
              });
            else {
              // checked가 아니면 현재 유저가 태그해 놓은 태그에 추가
              copyMyTagData.push(tag.name);
              setMyTagData(copyMyTagData);
            }
            cleanNotification();
          } else {
            showError("태그는 5개까지 추가할 수 있습니다.", null);
          }
        }}
      >
        {tag.name}
      </Button>
    );
  });

  const selectedTag = myTagData.map((tagName) => (
    <Box className={classes.selectedTag}>
      <Group spacing={"0.3rem"}>
        {tagName}
        <InvisibleButton
          onClick={() => {
            // 현재 유저가 태그해 놓은 태그에서 제거
            let copyMyTagData = [...myTagData];
            myTagData.forEach((value, index) => {
              if (tagName === value) {
                copyMyTagData.splice(index, 1); // index 부터 1개의 요소를 제거
                setMyTagData(copyMyTagData);
              }
            });
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
          <Group className={classes.searchGroup} ref={focusTrapRef}>
            <IconSearch stroke={2} size={"1.2rem"} color={theme.colors.gray[6]} />
            <TextInput
              className={classes.search}
              placeholder="원하는 태그를 검색해서 추가해보세요."
              data-autofocus
              ref={searchRef}
              onKeyDown={handleKeyDown}
              rightSection={
                <InvisibleButton
                  onClick={() => {
                    setSearch("");
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
        <Button
          variant="light"
          color="cyan"
          h={"2.5rem"}
          onClick={() => {
            // 유저가 이전에 추가한 태그와 현재 추가한 태그 비교
            // 없어진 태그 Delete
            myPrevTagData
              ? myPrevTagData.data.forEach((value) => {
                  if (!myTagData.includes(value.tag.name)) {
                    // delete 요청 진행
                    deleteGameTag(gameId, value.id, token);
                  }
                })
              : null;
            // 새로 생긴 태그 Post
            myTagData.forEach((value) => {
              if (!myPrevTagList.includes(value)) {
                // Post 요청 진행
                PostGameTag(gameId, { tagName: value }, token);
              }
            });
            // 모든 요청이 완료된 이후
            mutatePost();
            onClose ? onClose() : null;
          }}
        >
          추가
        </Button>
      </Group>
    </Stack>
  );
}
