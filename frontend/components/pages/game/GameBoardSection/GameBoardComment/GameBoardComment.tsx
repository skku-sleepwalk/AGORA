import {
  Alert,
  Avatar,
  Box,
  Button,
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
import { useGameBoardCommentStyles } from "./GameBoardComment.styles";
import { MOCKUP_CONTENT } from "../../../../../mockups/post";
import {
  IconAlertCircle,
  IconBell,
  IconDotsVertical,
  IconHeart,
  IconPencil,
  IconThumbDown,
  IconThumbDownFilled,
  IconThumbUp,
  IconThumbUpFilled,
  IconTrash,
} from "@tabler/icons-react";
import { useMediaQuery, useSetState } from "@mantine/hooks";
import InvisibleButton from "../../../../common/InvisibleButton/InvisibleButton";
import { GameBoard } from "../../../../../types/api/game/gameBoard";
import { getRelativeTime } from "../../../../../utils/getRelativeTime";
import {
  createGameBoardLike,
  deleteGameBoardLike,
} from "../../../../../utils/api/game/gameBoard/gameBoardLike";
import useAuth from "../../../../../hooks/useAuth";
import { deleteGameBoard } from "../../../../../utils/api/game/gameBoard/deleteGameBoard";
import { showNotification } from "../../../../../utils/notifications";
import { useState } from "react";
import { GameTextWriter } from "../../GameTextWriter/GameTextWriter";

export interface GameBoardCommentProps {
  post: GameBoard;
  gameId: string;
  mutatePost: () => void;
}

export function GameBoardComment({ post, gameId, mutatePost }: GameBoardCommentProps) {
  const smallScreen = useMediaQuery("(max-width: 765px)");
  const { classes, cx } = useGameBoardCommentStyles({ smallScreen });
  const theme = useMantineTheme();
  const { token } = useAuth();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

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
              <Text fz={smallScreen ? 14 : 18}>{post.author.name}</Text>
              <Text fz={smallScreen ? 12 : 14} color={theme.colors.gray[4]}>
                {getRelativeTime(post.createdAt)}
              </Text>
            </Group>
            <Text fz={smallScreen ? 12 : 14} color={theme.colors.gray[5]}>
              {post.author.description}
            </Text>
          </Stack>
        </Group>
        {/* 후기 내용 */}
        <Stack className={classes.marginLeft} spacing={0}>
          {!isEditing ? (
            <TypographyStylesProvider className={classes.commentTypo}>
              <Spoiler
                className={classes.spoiler}
                maxHeight={smallScreen ? 4.1 * 16 : 5.9 * 16}
                showLabel="자세히 보기"
                hideLabel="숨기기"
              >
                <div
                  className={classes.content}
                  dangerouslySetInnerHTML={{
                    __html: post.content,
                  }}
                />
              </Spoiler>
            </TypographyStylesProvider>
          ) : (
            <GameTextWriter
              gameId={gameId}
              boardId={post.id}
              content={post.content}
              placeholder={"댓글을 입력하세요."}
              parentBoardCategoryNames={post.categories.map((category) => category.name)}
              completePatch={() => {
                setIsEditing(false);
                mutatePost();
              }}
            />
          )}
        </Stack>
        {isDeleting && (
          <Alert
            icon={<IconAlertCircle size="1rem" />}
            title="댓글을 삭제하시겠습니까?"
            color="red"
            withCloseButton
            onClose={() => {
              setIsDeleting(false);
            }}
          >
            <Stack spacing={"xs"}>
              댓글을 삭제하면 되돌릴 수 없습니다.
              <Group position="right">
                <Button
                  variant="outline"
                  color="red"
                  onClick={() => {
                    deleteGameBoard(gameId, post.id, token).then(() => {
                      mutatePost();
                      showNotification("댓글 삭제 완료", "게시글이 삭제되었습니다.");
                      setIsDeleting(false);
                    });
                  }}
                >
                  삭제
                </Button>
              </Group>
            </Stack>
          </Alert>
        )}
        <Group className={classes.marginLeft} position="apart">
          <Group spacing="0.3rem">
            <InvisibleButton
              onClick={() => {
                if (post.like) {
                  deleteGameBoardLike(gameId, post.id, token).then(() => {
                    mutatePost();
                  });
                } else {
                  createGameBoardLike(gameId, post.id, token).then(() => {
                    mutatePost();
                  });
                }
              }}
            >
              <IconHeart
                stroke={1.5}
                size={smallScreen ? "1rem" : "1.5rem"}
                fill={post.like ? theme.colors.red[6] : "white"}
              />
            </InvisibleButton>
            <Text fz={14}>{post.likeCount}</Text>
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
                    onClick={() => {
                      setIsEditing(true);
                    }}
                    icon={<IconPencil size={18} stroke={2} />}
                    className={classes.menuItem}
                  >
                    수정하기
                  </Menu.Item>
                  <Menu.Divider />
                  <Menu.Item
                    icon={<IconTrash size={18} stroke={2} />}
                    className={classes.menuItem}
                    onClick={() => {
                      setIsDeleting(true);
                    }}
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
