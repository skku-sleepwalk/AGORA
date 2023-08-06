import {
  Avatar,
  Box,
  Button,
  Collapse,
  Divider,
  Group,
  Loader,
  Spoiler,
  Stack,
  Text,
  TextInput,
  TypographyStylesProvider,
  useMantineTheme,
} from "@mantine/core";
import { useGameReviewStyles } from "./GameReview.styles";
import {
  IconMessages,
  IconThumbDown,
  IconThumbDownFilled,
  IconThumbUp,
  IconThumbUpFilled,
} from "@tabler/icons-react";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { GameReviewReply } from "../GameReviewReply/GameReviewReply";
import { GameTextWriter } from "../../GameTextWriter/GameTextWriter";
import { useGameReviewList } from "../../../../../hooks/useGameReview";
import useAuth from "../../../../../hooks/useAuth";
import {
  DelGameReviewDislike,
  DelGameReviewLike,
  PostGameReviewDislike,
  PostGameReviewLike,
} from "../../../../../utils/api/game/gameReview/GameReviewLike";
import { GameReview } from "../../../../../types/api/game/gameReview";
import { createContext, useContext } from "react";
import { GameReviewSectionContext, authorPlaytime } from "../GameReviewSection";
import { getRelativeTime } from "../../../../../utils/getRelativeTime";

export interface GameReviewProps {
  gameId: string;
  data: GameReview;
}

// mutate 관련 context
export const GameReviewContext = createContext({
  mutategameReviewComment: () => {},
});

export function GameReview({ gameId, data }: GameReviewProps) {
  const smallScreen = useMediaQuery("(max-width: 765px)");
  const { classes, cx } = useGameReviewStyles({ smallScreen });
  const theme = useMantineTheme();

  const { token } = useAuth();
  const { mutateGameReview, mutateGameReviewMine } = useContext(GameReviewSectionContext);

  const {
    data: gameReviewCommentData,
    setSize: setgameReviewCommentSize,
    isLoading: isgameReviewCommentLoading,
    mutate: mutategameReviewComment,
  } = useGameReviewList({ gameId: gameId, reviewId: data.id });

  // 후기 좋아요 싫어요 관련 로직
  const handleLike = () => {
    if (data.like) {
      DelGameReviewLike(gameId, data.id, token).then(() => {
        mutateGameReview();
        if (data.author.email === token) {
          mutateGameReviewMine();
        }
      });
    } else {
      PostGameReviewLike(gameId, data.id, token).then(() => {
        // 좋아요 싫어요 동시 선택이 안되도록
        if (data.dislike) {
          DelGameReviewDislike(gameId, data.id, token).then(() => {
            mutateGameReview();
            if (data.author.email === token) {
              mutateGameReviewMine();
            }
          });
        } else {
          mutateGameReview();
          if (data.author.email === token) {
            mutateGameReviewMine();
          }
        }
      });
    }
  };

  const handleDislike = () => {
    if (data.dislike) {
      DelGameReviewDislike(gameId, data.id, token).then(() => {
        mutateGameReview();
        if (data.author.email === token) {
          mutateGameReviewMine();
        }
      });
    } else {
      PostGameReviewDislike(gameId, data.id, token).then(() => {
        // 좋아요 싫어요 동시 선택이 안되도록
        if (data.like) {
          DelGameReviewLike(gameId, data.id, token).then(() => {
            mutateGameReview();
            if (data.author.email === token) {
              mutateGameReviewMine();
            }
          });
        } else {
          mutateGameReview();
          if (data.author.email === token) {
            mutateGameReviewMine();
          }
        }
      });
    }
  };

  // 답글 관련
  const [opened, { toggle }] = useDisclosure(false);
  const canReview = true;

  return (
    <GameReviewContext.Provider value={{ mutategameReviewComment }}>
      <Box>
        <Divider />
        <Stack className={classes.stack} spacing={"lg"}>
          {/* 유저 소개 및 작성 날짜 */}
          <Group position="apart" align="flex-start">
            <Group align="flex-end">
              <Avatar
                radius="xl"
                size={smallScreen ? 30 : 46}
                src={"https://avatars.githubusercontent.com/u/52057157?v=4"}
              />
              <Stack spacing={"0.2rem"}>
                <Text fz={smallScreen ? 14 : 18}>{data.author.name}</Text>
                <Text fz={smallScreen ? 12 : 14} color={theme.colors.blue[4]}>
                  {authorPlaytime(data.author.playtime)}
                </Text>
              </Stack>
            </Group>
            <Text fz={smallScreen ? 12 : 14} color={theme.colors.gray[4]}>
              {getRelativeTime(data.createdAt)}
            </Text>
          </Group>
          {/* 후기 내용 */}
          <Stack className={classes.marginLeft} spacing={0}>
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
          <Group className={classes.marginLeft} position="apart">
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
            </Group>
          </Group>
          {/* 후기 답글 */}
          <Collapse in={opened} className={classes.marginLeft}>
            {/* 후기 답글 작성 파트 */}
            <Divider />
            <Group className={classes.myReviewGroup}>
              <Avatar
                radius="xl"
                size={smallScreen ? 30 : 46}
                src={"https://avatars.githubusercontent.com/u/52057157?v=4"}
              />
              <Box className={classes.reviewEditorBox}>
                {/* 후기 작성 에디터 파트 */}
                {canReview && (
                  <GameTextWriter
                    placeholder={"후기에 답글을 달아보세요."}
                    gameId={gameId}
                    commentId={data.id}
                    authorEmail={data.author.email}
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
            {gameReviewCommentData?.map((comment) => {
              return comment.data.data.map((comment) => (
                <GameReviewReply gameId={gameId} reviewId={data.id} data={comment} />
              ));
            })}
            {isgameReviewCommentLoading && (
              <Box className={classes.loader}>
                <Loader variant="dots" />
              </Box>
            )}
          </Collapse>
        </Stack>
      </Box>
    </GameReviewContext.Provider>
  );
}
