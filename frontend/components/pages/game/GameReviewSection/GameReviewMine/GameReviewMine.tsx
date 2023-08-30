import {
  Avatar,
  Box,
  Button,
  Collapse,
  Divider,
  Group,
  Loader,
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
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { GameTextWriter } from "../../GameTextWriter/GameTextWriter";
import { GameReviewReply } from "../GameReviewReply/GameReviewReply";
import { GameReview } from "../../../../../types/api/game/gameReview";
import { getRelativeTime } from "../../../../../utils/getRelativeTime";
import deleteGameReview from "../../../../../utils/api/game/gameReview/deleteGameReview";
import useAuth from "../../../../../hooks/useAuth";
import { createContext, useContext, useState } from "react";
import { GameReviewSectionContext, hasPlaytime } from "../GameReviewSection";
import { showNotification } from "../../../../../utils/notifications";
import {
  DelGameReviewDislike,
  DelGameReviewLike,
  PostGameReviewDislike,
  PostGameReviewLike,
} from "../../../../../utils/api/game/gameReview/GameReviewLike";
import { useGameReviewList } from "../../../../../hooks/game/useGameReview";
import { useUserPlaytimes } from "../../../../../hooks/game/useUserPlaytimes";

export interface GameReviewMineProps {
  gameId: string;
  data: GameReview;
}

// mutate 관련 context
export const GameReviewMineContext = createContext({
  mutategameReviewMineComment: () => {},
});

export function GameReviewMine({ gameId, data }: GameReviewMineProps) {
  const smallScreen = useMediaQuery("(max-width: 765px)");
  const { classes, cx } = useGameReviewMineStyles({ smallScreen });
  const theme = useMantineTheme();

  const { user, token } = useAuth();

  const {
    data: gameReviewMineCommentData,
    setSize: setgameReviewMineCommentSize,
    isLoading: isgameReviewMineCommentLoading,
    mutate: mutategameReviewMineComment,
  } = useGameReviewList({ gameId: gameId, reviewId: data.id });

  const { mutateGameReview, mutateGameReviewMine } = useContext(GameReviewSectionContext);

  // 후기 좋아요 싫어요 관련 로직
  const handleLike = () => {
    if (data.like) {
      DelGameReviewLike(gameId, data.id, token).then(() => {
        mutateGameReviewMine();
        mutateGameReview();
      });
    } else {
      PostGameReviewLike(gameId, data.id, token).then(() => {
        // 좋아요 싫어요 동시 선택이 안되도록
        if (data.dislike) {
          DelGameReviewDislike(gameId, data.id, token).then(() => {
            mutateGameReviewMine();
            mutateGameReview();
          });
        } else {
          mutateGameReviewMine();
          mutateGameReview();
        }
      });
    }
  };

  const handleDislike = () => {
    if (data.dislike) {
      DelGameReviewDislike(gameId, data.id, token).then(() => {
        mutateGameReviewMine();
        mutateGameReview();
      });
    } else {
      PostGameReviewDislike(gameId, data.id, token).then(() => {
        // 좋아요 싫어요 동시 선택이 안되도록
        if (data.like) {
          DelGameReviewLike(gameId, data.id, token).then(() => {
            mutateGameReviewMine();
            mutateGameReview();
          });
        } else {
          mutateGameReviewMine();
          mutateGameReview();
        }
      });
    }
  };

  // 수정 관련 로직
  const [isEditing, setIsEditing] = useState(false);

  // 답글 관련
  const [opened, { toggle }] = useDisclosure(false);

  const { data: me } = useUserPlaytimes();
  const canReview = me !== undefined ? hasPlaytime(me.data.playtimes, gameId) : false;

  return (
    <GameReviewMineContext.Provider value={{ mutategameReviewMineComment }}>
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
                className={classes.spoiler}
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
                onClick={handleLike}
              >
                <Group spacing={"xs"}>
                  {data.like ? (
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
                onClick={handleDislike}
              >
                <Group spacing={"xs"}>
                  {data.dislike ? (
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
                      deleteGameReview(gameId, data.id, token).then(() => {
                        mutateGameReviewMine();
                        mutateGameReview();
                        showNotification("후기 삭제 완료!", "후기가 정상적으로 삭제되었습니다.");
                      });
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
                  <GameTextWriter
                    placeholder={"후기에 답글을 달아보세요."}
                    gameId={gameId}
                    reviewId={data.id}
                    isInReviewMine={true}
                  />
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
            {gameReviewMineCommentData?.map((comment) => {
              return comment.data.data.map((comment) => (
                <GameReviewReply
                  gameId={gameId}
                  reviewId={data.id}
                  data={comment}
                  isInReviewMine={true}
                />
              ));
            })}
            {isgameReviewMineCommentLoading && (
              <Box className={classes.loader}>
                <Loader variant="dots" />
              </Box>
            )}
          </Collapse>
        </Stack>
      )}
      {isEditing && (
        <GameTextWriter
          completePatch={() => setIsEditing(false)}
          placeholder={"도움이 되는 착한 후기를 남겨보세요."}
          gameId={gameId}
          content={data.content}
        />
      )}
    </GameReviewMineContext.Provider>
  );
}
