import {
  Avatar,
  Box,
  Button,
  Divider,
  Group,
  Menu,
  Stack,
  Text,
  TypographyStylesProvider,
  UnstyledButton,
  useMantineTheme,
} from "@mantine/core";
import { useGameBoardCommentStyles } from "./GameBoardComment.styles";
import { MOCKUP_CONTENT } from "../../../../../mockups/post";
import {
  IconBell,
  IconDotsVertical,
  IconPencil,
  IconThumbDown,
  IconThumbDownFilled,
  IconThumbUp,
  IconThumbUpFilled,
  IconTrash,
} from "@tabler/icons-react";
import { useDisclosure, useMediaQuery, useSetState } from "@mantine/hooks";
import { useState } from "react";
import { ShortenText } from "../../GameTextWriter/GameTextWriter";
import InvisibleButton from "../../../../common/InvisibleButton/InvisibleButton";

export function GameBoardComment() {
  const smallScreen = useMediaQuery("(max-width: 765px)");
  const { classes, cx } = useGameBoardCommentStyles({ smallScreen });
  const theme = useMantineTheme();

  // 자세히 보기 관련 로직
  const [shortenedText, isShorten] = ShortenText({
    text: MOCKUP_CONTENT,
    length: smallScreen ? 70 : 200,
  });
  const [viewMore, setViewMore] = useState<boolean>(false);

  // 후기 좋아요 싫어요 관련 로직
  const [goodBadstate, setGoodBadState] = useSetState({ good: false, bad: false });
  const handleGoodState = () => {
    setGoodBadState({ good: !goodBadstate.good });
    if (!goodBadstate.good && goodBadstate.bad) {
      setGoodBadState({ bad: !goodBadstate.bad });
    }
  };
  const handleBadState = () => {
    setGoodBadState({ bad: !goodBadstate.bad });
    if (goodBadstate.good && !goodBadstate.bad) {
      setGoodBadState({ good: !goodBadstate.good });
    }
  };

  // 답글 관련
  const canEdit = true;

  return (
    <Box>
      <Divider />
      <Stack className={classes.stack} spacing={"sm"}>
        {/* 유저 소개 및 작성 날짜 */}
        <Group>
          <Avatar
            radius="xl"
            size={smallScreen ? 30 : 46}
            src={"https://avatars.githubusercontent.com/u/52057157?v=4"}
          />
          <Stack className={classes.userStack} spacing={"0.4rem"}>
            <Group position="apart">
              <Text fz={smallScreen ? 14 : 18}>내가 세상에서 제일 귀엽고 이뻐!!</Text>
              <Text fz={smallScreen ? 12 : 14} color={theme.colors.gray[4]}>
                15일 전
              </Text>
            </Group>
            <Text fz={smallScreen ? 12 : 14} color={theme.colors.gray[5]}>
              What's your ETA?
            </Text>
          </Stack>
        </Group>
        {/* 후기 내용 */}
        <Stack className={classes.marginLeft} spacing={0}>
          <TypographyStylesProvider className={classes.commentTypo}>
            {!viewMore && (
              <div
                className={classes.content}
                dangerouslySetInnerHTML={{
                  __html: shortenedText,
                }}
              />
            )}
            {viewMore && (
              <div
                className={classes.content}
                dangerouslySetInnerHTML={{
                  __html: MOCKUP_CONTENT,
                }}
              />
            )}
          </TypographyStylesProvider>
          {isShorten && !viewMore && (
            <UnstyledButton
              className={classes.viewMoreButton}
              fz={smallScreen ? 14 : 16}
              c={theme.colors.gray[4]}
              onClick={() => setViewMore(true)}
            >
              자세히 보기
            </UnstyledButton>
          )}
        </Stack>
        {/* 후기 하단 버튿들 */}
        <Group className={classes.marginLeft} position="apart">
          <Group>
            <InvisibleButton onClick={handleGoodState}>
              <Group spacing={"0.3rem"}>
                {goodBadstate.good ? (
                  <IconThumbUpFilled stroke={1.5} size={smallScreen ? "1rem" : "1.5rem"} />
                ) : (
                  <IconThumbUp stroke={1.5} size={smallScreen ? "1rem" : "1.5rem"} />
                )}
                <Text fz={14}>2</Text>
              </Group>
            </InvisibleButton>
            <InvisibleButton onClick={handleBadState}>
              <Group spacing={"0.3rem"}>
                {goodBadstate.bad ? (
                  <IconThumbDownFilled stroke={1.5} size={smallScreen ? "1rem" : "1.5rem"} />
                ) : (
                  <IconThumbDown stroke={1.5} size={smallScreen ? "1rem" : "1.5rem"} />
                )}
                <Text fz={14}>1</Text>
              </Group>
            </InvisibleButton>
          </Group>
          <Menu shadow="md" width={120} position="bottom-end" offset={1}>
            <Menu.Target>
              <UnstyledButton className={classes.dotButton}>
                <IconDotsVertical />
              </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
              {!canEdit && (
                <Menu.Item icon={<IconBell size={18} stroke={2} />} className={classes.menuItem}>
                  신고하기
                </Menu.Item>
              )}
              {canEdit && (
                <>
                  <Menu.Item
                    onClick={() => {}}
                    icon={<IconPencil size={18} stroke={2} />}
                    className={classes.menuItem}
                  >
                    수정하기
                  </Menu.Item>
                  <Menu.Divider />
                  <Menu.Item
                    onClick={() => {}}
                    icon={<IconTrash size={18} stroke={2} />}
                    className={classes.menuItem}
                  >
                    삭제하기
                  </Menu.Item>
                </>
              )}
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Stack>
    </Box>
  );
}
