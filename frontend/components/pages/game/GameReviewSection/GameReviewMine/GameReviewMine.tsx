import {
  Avatar,
  Box,
  Button,
  Collapse,
  Divider,
  Group,
  Menu,
  Spoiler,
  Stack,
  Text,
  TextInput,
  TypographyStylesProvider,
  UnstyledButton,
  useMantineTheme,
} from "@mantine/core";
import { useGameReviewMineStyles } from "./GameReviewMine.styles";
import {
  IconDotsVertical,
  IconMessages,
  IconPencil,
  IconThumbDown,
  IconThumbDownFilled,
  IconThumbUp,
  IconThumbUpFilled,
  IconTrash,
} from "@tabler/icons-react";
import { useDisclosure, useMediaQuery, useSetState } from "@mantine/hooks";
import { GameTextWriter } from "../../GameTextWriter/GameTextWriter";
import { GameReviewReply } from "../GameReviewReply/GameReviewReply";
import { GameReview } from "../../../../../types/api/game/gameReview";
import { getRelativeTime } from "../../../../../utils/getRelativeTime";
import deleteGameReview from "../../../../../utils/api/game/deleteGameReview";
import useAuth from "../../../../../hooks/useAuth";
import { mutate } from "swr";
import { useState } from "react";

export interface GameReviewMineProps {
  mutateGameReviewMine?: () => void;
  gameId: string;
  data: GameReview;
}

export function GameReviewMine({ mutateGameReviewMine, gameId, data }: GameReviewMineProps) {
  const smallScreen = useMediaQuery("(max-width: 765px)");
  const { classes, cx } = useGameReviewMineStyles({ smallScreen });
  const theme = useMantineTheme();

  const { user, token } = useAuth();

  // 수정 관련 로직
  const [isEditing, setIsEditing] = useState(false);

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
  const [opened, { toggle }] = useDisclosure(false);
  const canReview = true;

  return (
    <>
      {!isEditing && (
        <Stack className={classes.stack} spacing={"lg"}>
          {/* 작성 날짜 */}
          <Group position="apart">
            <Text fz={smallScreen ? 14 : 18} fw={"bold"} color={theme.colors.blue[6]}>
              내가 작성한 후기
            </Text>
            <Text fz={smallScreen ? 12 : 14} color={theme.colors.gray[4]}>
              {getRelativeTime(data.createdAt)}
            </Text>
          </Group>
          {/* 후기 내용 */}
          <Stack spacing={0}>
            <TypographyStylesProvider className={classes.reviewTypo}>
              <Spoiler
                maxHeight={smallScreen ? 4.1 * 16 : 5.9 * 16}
                showLabel="자세히 보기"
                hideLabel="숨기기"
              >
                <div
                  className={classes.content}
                  dangerouslySetInnerHTML={{
                    __html: data.content,
                  }}
                />
              </Spoiler>
            </TypographyStylesProvider>
          </Stack>
          {/* 후기 하단 버튿들 */}
          <Group position="apart">
            <Button
              className={classes.button}
              size="xs"
              variant="outline"
              color="dark"
              leftIcon={<IconMessages stroke={1.5} size={smallScreen ? "1rem" : "1.5rem"} />}
              onClick={toggle}
            >
              답글
            </Button>
            <Group spacing={"xs"}>
              <Button
                className={cx(classes.button, smallScreen ? classes.buttonPadding : null)}
                size="xs"
                variant="outline"
                color="dark"
                onClick={handleGoodState}
              >
                <Group spacing={"xs"}>
                  {goodBadstate.good ? (
                    <IconThumbUpFilled stroke={1.5} size={smallScreen ? "1rem" : "1.5rem"} />
                  ) : (
                    <IconThumbUp stroke={1.5} size={smallScreen ? "1rem" : "1.5rem"} />
                  )}
                  <Text>{data.likeCount}</Text>
                </Group>
              </Button>
              <Button
                className={cx(classes.button, smallScreen ? classes.buttonPadding : null)}
                size="xs"
                variant="outline"
                color="dark"
                onClick={handleBadState}
              >
                <Group spacing={"xs"}>
                  {goodBadstate.bad ? (
                    <IconThumbDownFilled stroke={1.5} size={smallScreen ? "1rem" : "1.5rem"} />
                  ) : (
                    <IconThumbDown stroke={1.5} size={smallScreen ? "1rem" : "1.5rem"} />
                  )}
                  <Text>{data.dislikeCount}</Text>
                </Group>
              </Button>
              <Menu shadow="md" width={120} position="bottom-end" offset={10}>
                <Menu.Target>
                  <UnstyledButton className={classes.dotButton}>
                    <IconDotsVertical stroke={1.5} size={smallScreen ? "1rem" : "1.5rem"} />
                  </UnstyledButton>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item
                    icon={<IconPencil size={18} stroke={2} />}
                    className={classes.menuItem}
                    onClick={() => {
                      setIsEditing(true);
                    }}
                  >
                    수정하기
                  </Menu.Item>
                  <Menu.Divider />
                  <Menu.Item
                    icon={<IconTrash size={18} stroke={2} />}
                    className={classes.menuItem}
                    onClick={() => {
                      deleteGameReview(gameId, data.id, token);
                      mutateGameReviewMine !== undefined ? mutateGameReviewMine() : null;
                    }}
                  >
                    삭제하기
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Group>
          </Group>
          {/* 후기 답글 */}
          <Collapse in={opened}>
            {/* 후기 답글 작성 파트 */}
            <Divider />
            <Group className={classes.myReviewGroup}>
              <Avatar
                radius="xl"
                size={smallScreen ? 30 : 46}
                src={"https://avatars.githubusercontent.com/u/52057157?v=4"}
              />
              <Box className={classes.reviewEditorBox}>
                {/* 후기 답글 작성 에디터 파트 */}
                {canReview && (
                  <GameTextWriter gameId={data.id} placeholder={"후기에 답글을 달아보세요."} />
                )}
                {!canReview && (
                  <TextInput
                    className={classes.reviewNo}
                    placeholder="게임을 플레이하고 후기에 답글을 달아보세요."
                    disabled
                  />
                )}
              </Box>
            </Group>
            {/* <GameReviewReply opened={opened} />
          <GameReviewReply opened={opened} />
          <GameReviewReply opened={opened} /> */}
          </Collapse>
        </Stack>
      )}
      {isEditing && (
        <GameTextWriter
          mutate={mutateGameReviewMine}
          placeholder={"도움이 되는 착한 후기를 남겨보세요."}
          gameId={gameId}
          isPatch={true}
          content={data.content}
        />
      )}
    </>
  );
}
