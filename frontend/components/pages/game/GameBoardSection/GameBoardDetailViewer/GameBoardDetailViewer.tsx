import {
  Avatar,
  Box,
  Group,
  Menu,
  Stack,
  Text,
  Title,
  TypographyStylesProvider,
  UnstyledButton,
  useMantineTheme,
} from "@mantine/core";
import CardContainer from "../../../../common/CardContainer/CardContainer";
import { useGameBoardDetailViewerStyles } from "./GameBoardDetailViewer.styles";
import { useMediaQuery } from "@mantine/hooks";
import { MOCKUP_CONTENT } from "../../../../../mockups/post";
import {
  IconBell,
  IconBookmark,
  IconChevronLeft,
  IconDotsVertical,
  IconHeart,
  IconMessages,
  IconPencil,
  IconShare,
  IconTrash,
} from "@tabler/icons-react";
import InvisibleButton from "../../../../common/InvisibleButton/InvisibleButton";
import { GameTextWriter } from "../../GameTextWriter/GameTextWriter";
import { GameBoardComment } from "../GameBoardComment/GameBoardComment";
import { useRouter } from "next/router";
import useGameBoard from "../../../../../hooks/useGameBoard";
import { getRelativeTime } from "../../../../../utils/getRelativeTime";
import useGameBoardList from "../../../../../hooks/useGameBoardList";
import { GAME_BOARD_CATEGORIES } from "../../../../../constants/category";
import { createContext } from "react";
import {
  createGameBoardLike,
  deleteGameBoardLike,
} from "../../../../../utils/api/game/gameBoard/gameBoardLike";
import useAuth from "../../../../../hooks/useAuth";

export interface GameBoardDetailViewerProps {
  gameId: string;
  boardId: string;
}

export const GameBoardDetailViewerContext = createContext({
  mutateGameBoardComment: () => {},
});

export function GameBoardDetailViewer({ gameId, boardId }: GameBoardDetailViewerProps) {
  const smallScreen = useMediaQuery("(max-width: 765px)");
  const { classes, cx } = useGameBoardDetailViewerStyles({ smallScreen });
  const theme = useMantineTheme();
  const router = useRouter();
  const { data: postData, mutate: mutatePost } = useGameBoard(gameId, boardId);
  const { data: commentData, mutate: mutateComment } = useGameBoardList(
    GAME_BOARD_CATEGORIES,
    gameId,
    {
      parentId: boardId,
    }
  );
  const canEdit = true;
  const { token } = useAuth();

  return (
    postData && (
      <CardContainer className={classes.boardDetailViewer}>
        <Stack>
          {/* 이전으로 이동 버튼 */}
          <UnstyledButton onClick={() => router.back()}>
            <Group spacing={"0.2rem"}>
              <IconChevronLeft color={theme.colors.gray[5]} />
              <Text color={theme.colors.gray[5]}>목록으로</Text>
            </Group>
          </UnstyledButton>
          {/* 게시글 정보 */}
          <Group>
            <Avatar
              radius="xl"
              size={smallScreen ? 30 : 46}
              src={"https://avatars.githubusercontent.com/u/52057157?v=4"}
            />
            <Stack className={classes.userStack} spacing={"0.4rem"}>
              <Group position="apart">
                <Text fz={smallScreen ? 14 : 18}>{postData.data.author.name}</Text>
                <Text fz={smallScreen ? 12 : 14} color={theme.colors.gray[4]}>
                  {getRelativeTime(postData.data.createdAt)}
                </Text>
              </Group>
              <Text fz={smallScreen ? 12 : 14} color={theme.colors.gray[5]}>
                {postData.data.author.description}
              </Text>
            </Stack>
          </Group>
          {/* 게시글 내용 */}
          <Stack className={classes.marginLeft} spacing={"xs"}>
            <Title order={3}>{postData.data.title}</Title>
            <TypographyStylesProvider>
              <div
                className={classes.content}
                dangerouslySetInnerHTML={{
                  __html: postData.data.content,
                }}
              />
            </TypographyStylesProvider>
          </Stack>
          {/* 게시글 푸터 */}
          <Group className={classes.footerGroup} position="apart">
            <Group spacing={"sm"}>
              <Group spacing={"0.3rem"}>
                <IconMessages stroke={1.5} size={smallScreen ? "1rem" : "1.5rem"} />
                <Text fz={14}>{postData.data.childCount}</Text>
              </Group>
              <Group spacing={"0.3rem"}>
                <InvisibleButton
                  onClick={() => {
                    if (postData.data.like) {
                      deleteGameBoardLike(gameId, boardId, token).then(() => {
                        mutatePost();
                      });
                    } else {
                      createGameBoardLike(gameId, boardId, token).then(() => {
                        mutatePost();
                      });
                    }
                  }}
                >
                  <IconHeart
                    stroke={1.5}
                    size={smallScreen ? "1rem" : "1.5rem"}
                    fill={postData.data.like ? theme.colors.red[6] : "white"}
                  />
                </InvisibleButton>
                <Text fz={14}>{postData.data.likeCount}</Text>
              </Group>
              <InvisibleButton>
                <IconShare stroke={1.5} size={smallScreen ? "1rem" : "1.5rem"} />
              </InvisibleButton>
              <InvisibleButton>
                <IconBookmark stroke={1.5} size={smallScreen ? "1rem" : "1.5rem"} />
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
          {/* 게시글 댓글 파트 */}
          <Box className={classes.marginLeft}>
            <GameBoardDetailViewerContext.Provider
              value={{ mutateGameBoardComment: mutateComment }}
            >
              <GameTextWriter
                placeholder={"이 게시글에 댓글을 남겨보세요."}
                parentBoardId={boardId}
                gameId={gameId}
                parentBoardCategoryNames={postData.data.categories.map((category) => category.name)}
              />
            </GameBoardDetailViewerContext.Provider>
          </Box>
          {/* <GameBoardComment />
          <GameBoardComment /> */}
          {commentData?.map((data) => {
            return data.data.data.map((comment) => {
              return (
                <GameBoardComment
                  key={comment.id}
                  post={comment}
                  gameId={gameId}
                  mutatePost={mutateComment}
                />
              );
            });
          })}
        </Stack>
      </CardContainer>
    )
  );
}
