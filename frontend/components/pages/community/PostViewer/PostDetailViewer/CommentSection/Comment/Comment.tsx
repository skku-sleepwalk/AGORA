import {
  Alert,
  Button,
  Center,
  Collapse,
  Divider,
  Group,
  Loader,
  Menu,
  Stack,
  Text,
  TypographyStylesProvider,
  UnstyledButton,
  useMantineTheme,
} from "@mantine/core";
import CommentFrame from "../CommentFrame/CommentFrame";
import InvisibleButton from "../../../../../../common/InvisibleButton/InvisibleButton";
import {
  IconAlertCircle,
  IconBell,
  IconChevronDown,
  IconChevronUp,
  IconDots,
  IconHeart,
  IconHeartFilled,
  IconMessage,
  IconPencil,
  IconTrash,
} from "@tabler/icons-react";
import { useCommentStyles } from "./Comment.styles";
import CommentEditor, { CommentEditorPart } from "../CommentEditor/CommentEditor";
import { MOCKUP_USER } from "../../../../../../../mockups/user";
import { useDisclosure, useSetState } from "@mantine/hooks";
import { Board } from "../../../../../../../types/api/boards";
import useBoardList from "../../../../../../../hooks/useBoardList";
import { showNotification } from "../../../../../../../utils/notifications";
import { useContext } from "react";
import { CommunityContext } from "../../../../../../../pages/community";
import { CheckIsliking, onLikeClick } from "../../../../../../../utils/api/onLikeClick";
import useAuth from "../../../../../../../hooks/useAuth";
import { CommentContext } from "../CommentSection";

export interface CommentProps {
  post: Board;
  onSubmitComment?: (content: string, parentId: string) => Promise<any>;
}

function Comment({ post, onSubmitComment }: CommentProps) {
  const theme = useMantineTheme();
  const { classes } = useCommentStyles();
  const { token, user } = useAuth();

  const [editorOpen, { toggle: toggleEditor }] = useDisclosure(false);
  const [commentOpen, { toggle: toggleComment }] = useDisclosure(false);

  const {
    data,
    setSize,
    size,
    isEmpty,
    mutate: mutate,
    isLast,
    isLoading,
  } = useBoardList(
    post.categoryTypes.map((category) => category.name),
    {
      parentId: post.id,
    }
  );

  // boards/likedUsers에 현재 user-id가 들어있는 지 확인
  const isliking = user
    ? CheckIsliking({
        likedUsers: post.likedUsers,
        userEmail: user.id,
      })
    : false;

  // Edit 관련
  const [isEditing, setIsEditing] = useSetState({
    Edit: false,
    canEdit: user ? post.writer.id === user.id : false,
  });
  const [isDeleting, setIsDeleting] = useSetState({ delete: false });

  const { mutatePost } = useContext(CommunityContext);
  const { mutateComment } = useContext(CommentContext);

  return (
    <CommentFrame user={post.writer} withoutLeftBorder={!commentOpen}>
      <Stack spacing={0}>
        <Stack spacing={10} className={classes.comment}>
          {!isEditing.Edit && (
            <TypographyStylesProvider>
              <div className={classes.content} dangerouslySetInnerHTML={{ __html: post.content }} />
            </TypographyStylesProvider>
          )}
          {isEditing.Edit && (
            <CommentEditorPart
              onCancelClick={() => setIsEditing({ Edit: false })}
              onEditClick={() => {
                setIsEditing({ Edit: false });
                mutateComment();
              }}
              commentId={post.id}
              content={post.content}
              categoryNames={post.categoryTypes.map((category) => category.name)}
            />
          )}
          {isDeleting.delete && (
            <Alert
              icon={<IconAlertCircle size="1rem" />}
              title="댓글을 삭제하시겠습니까?"
              color="red"
              withCloseButton
              onClose={() => {
                setIsDeleting({ delete: false });
              }}
            >
              <Stack spacing={"xs"}>
                댓글을 삭제하면 되돌릴 수 없습니다.
                <Group position="right">
                  <Button
                    variant="light"
                    color="red"
                    className={classes.deleteButton}
                    onClick={() => {
                      setIsDeleting({ delete: false });
                      // 댓글 삭제시 함수
                      mutateComment();
                    }}
                  >
                    삭제
                  </Button>
                </Group>
              </Stack>
            </Alert>
          )}
          <Group spacing={8}>
            <Group spacing={5}>
              <InvisibleButton
                onClick={() => {
                  onLikeClick({ boardId: post.id, token })
                    .then(() => {
                      mutateComment();
                    })
                    .catch((error) => {
                      // 오류 처리
                    });
                }}
              >
                {isliking && <IconHeartFilled size={22} color={theme.colors.gray[6]} />}
                {!isliking && <IconHeart size={22} color={theme.colors.gray[6]} />}
              </InvisibleButton>
              <Text color={theme.colors.gray[6]} size="xs">
                {post.like}
              </Text>
            </Group>
            {!isEditing.Edit && (
              <>
                <InvisibleButton
                  onClick={() => {
                    toggleEditor();
                    !editorOpen && !commentOpen ? toggleComment() : null;
                  }}
                >
                  <Group spacing={5}>
                    <IconMessage size={22} color={theme.colors.gray[6]} />
                    <Text color={theme.colors.gray[6]} size="xs">
                      답하기
                    </Text>
                  </Group>
                </InvisibleButton>
                {!isDeleting.delete && (
                  <Menu shadow="md" width={120} position="bottom-start" offset={1}>
                    <Menu.Target>
                      <UnstyledButton className={classes.dotButton}>
                        <IconDots size={22} color={theme.colors.gray[6]} />
                      </UnstyledButton>
                    </Menu.Target>
                    <Menu.Dropdown>
                      {!isEditing.canEdit && (
                        <Menu.Item
                          icon={<IconBell size={18} stroke={2} />}
                          className={classes.menuItem}
                        >
                          신고하기
                        </Menu.Item>
                      )}
                      {isEditing.canEdit && (
                        <>
                          <Menu.Item
                            onClick={() => {
                              setIsEditing({ Edit: true });
                            }}
                            icon={<IconPencil size={18} stroke={2} />}
                            className={classes.menuItem}
                          >
                            수정하기
                          </Menu.Item>
                          <Menu.Divider />
                          <Menu.Item
                            onClick={() => {
                              setIsDeleting({ delete: true });
                            }}
                            icon={<IconTrash size={18} stroke={2} />}
                            className={classes.menuItem}
                          >
                            삭제하기
                          </Menu.Item>
                        </>
                      )}
                    </Menu.Dropdown>
                  </Menu>
                )}
              </>
            )}
          </Group>
        </Stack>
        <Divider
          className={classes.divider}
          labelPosition="right"
          label={
            <InvisibleButton onClick={toggleComment}>
              <Group spacing={5} align="center">
                <Text color={theme.colors.gray[6]} size="sm">
                  {commentOpen ? "답글 접기" : "답글 보기"}
                </Text>
                {commentOpen ? (
                  <IconChevronUp size={16} color={theme.colors.gray[6]} />
                ) : (
                  <IconChevronDown size={16} color={theme.colors.gray[6]} />
                )}
              </Group>
            </InvisibleButton>
          }
        />
        <Collapse in={editorOpen}>
          <CommentEditor
            user={MOCKUP_USER}
            onSubmit={async (content) => {
              return onSubmitComment?.(content, post.id).then(() => {
                mutate();
                mutatePost();
                console.log(mutatePost);
                showNotification("답글 등록 완료", "답글이 성공적으로 등록되었습니다.");
                commentOpen ? null : toggleComment();
                toggleEditor();
              });
            }}
          />
        </Collapse>
      </Stack>
      <Collapse in={commentOpen}>
        <Stack spacing={0}>
          {isEmpty ? (
            <Text
              size="sm"
              color={theme.colors.gray[6]}
              align="center"
              className={classes.noComment}
            >
              등록된 답글이 없습니다.
            </Text>
          ) : (
            data?.map((data) => {
              return data.data.map((data) => (
                <Comment
                  key={data.id}
                  post={data}
                  onSubmitComment={async (content, parentId) => {
                    return onSubmitComment?.(content, parentId);
                  }}
                />
              ));
            })
          )}
          {!isLast &&
            !isEmpty &&
            (isLoading ? (
              <Center className={classes.moreButton}>
                <Loader size="sm" />
              </Center>
            ) : (
              <InvisibleButton
                onClick={() => {
                  setSize((prev) => prev + 1);
                }}
                className={classes.moreButton}
              >
                <Text color="gray" size="sm">
                  답글 더보기
                </Text>
              </InvisibleButton>
            ))}
        </Stack>
      </Collapse>
    </CommentFrame>
  );
}

export default Comment;
