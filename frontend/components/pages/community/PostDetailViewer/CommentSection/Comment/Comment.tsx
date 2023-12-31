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
  Image,
  TypographyStylesProvider,
  UnstyledButton,
  useMantineTheme,
} from "@mantine/core";
import CommentFrame from "../CommentFrame/CommentFrame";
import InvisibleButton from "../../../../../common/InvisibleButton/InvisibleButton";
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
import { MOCKUP_USER } from "../../../../../../mockups/user";
import { useDisclosure, useSetState } from "@mantine/hooks";
import { Board } from "../../../../../../types/api/boards";
import useBoardList from "../../../../../../hooks/useBoardList";
import { showNotification } from "../../../../../../utils/notifications";
import { useContext } from "react";
import { onLikeClick } from "../../../../../../utils/api/onLikeClick";
import useAuth from "../../../../../../hooks/useAuth";
import { CommentContext } from "../CommentSection";
import deletePost from "../../../../../../utils/api/deletepost";
import { ModalContext } from "../../../PostViewer/PostViewer";
import { PostContext } from "../../PostDetailViewer";

export interface CommentProps {
  post: Board;
  mutateReply?: () => void;
  onSubmitComment?: (content: string, parentId: string) => Promise<any>;
}

function Comment({ post, mutateReply, onSubmitComment }: CommentProps) {
  const theme = useMantineTheme();
  const { classes } = useCommentStyles();
  const { token, user, openSignInModal } = useAuth();

  const [editorOpen, { toggle: toggleEditor }] = useDisclosure(false);
  const [commentOpen, { toggle: toggleComment }] = useDisclosure(false);
  const {
    data,
    setSize,
    size,
    isEmpty,
    mutate: mutateCommentList,
    isLast,
    isLoading,
  } = useBoardList(
    post.categories.map((category) => category.name),
    {
      parentId: post.id,
    }
  );

  // boards/likedUsers에 현재 user-id가 들어있는 지 확인
  const isliking = post.like;

  // Edit 관련
  let writerID = post.author?.id;
  //예외처리
  if (post.author?.id === null) {
    writerID = "";
  }
  //예외처리
  const [isEditing, setIsEditing] = useSetState({
    Edit: false,
    canEdit: user ? writerID === user.id : false,
  });
  // post.writer.id 현재 편의를 위해 억지로 변경함 좌측 추후 이걸로 변경 필요요

  const [isDeleting, setIsDeleting] = useSetState({ delete: false });

  const { mutatePostDetail } = useContext(PostContext);
  const { mutateComment } = useContext(CommentContext);

  const { canCloseModal } = useContext(ModalContext);

  return (
    <CommentFrame user={post.author} date={post.createdAt} withoutLeftBorder={!commentOpen}>
      <Stack spacing={0}>
        <Stack spacing={10} className={classes.comment}>
          {!isEditing.Edit &&
            (post.content !== null ? (
              <TypographyStylesProvider>
                <div
                  className={classes.content}
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </TypographyStylesProvider>
            ) : (
              <Text color={theme.colors.gray[4]}>(삭제된 댓글입니다.)</Text>
            ))}
          {isEditing.Edit && (
            <CommentEditorPart
              onCancelClick={() => {
                setIsEditing({ Edit: false });
                canCloseModal();
              }}
              onEditClick={() => {
                setIsEditing({ Edit: false });
                mutateReply !== undefined ? mutateReply() : null;
                mutateComment();
                canCloseModal();
              }}
              commentId={post.id}
              content={post.content}
              categoryNames={post.categories.map((category) => category.name)}
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
                      //비동기
                      deletePost(post.id, token).then(() => {
                        mutateReply !== undefined ? mutateReply() : null;
                        mutateCommentList();
                        mutateComment();
                        mutatePostDetail();
                        showNotification("댓글 삭제 완료", "댓글이 성공적으로 삭제되었습니다.");
                      });
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
                  if (!user) {
                    openSignInModal();
                    return;
                  }
                  onLikeClick({ data: { boardId: post.id, token } }, isliking)
                    .then(() => {
                      mutateReply !== undefined ? mutateReply() : null;
                      mutateComment();
                      mutateCommentList();
                    })
                    .catch((error) => {
                      // 오류 처리
                    });
                }}
              >
                {isliking && (
                  <Image
                    className={classes.heartFilled}
                    width={"1.15rem"}
                    height={"1rem"}
                    src={"/images/HeartFilled.svg"}
                  />
                )}
                {!isliking && <IconHeart size={22} color={theme.colors.gray[6]} />}
              </InvisibleButton>
              <Text color={theme.colors.gray[6]} size="xs">
                {post.likeCount}
              </Text>
            </Group>
            {!isEditing.Edit && (
              <>
                <InvisibleButton
                  onClick={() => {
                    if (!user) {
                      openSignInModal();
                      return;
                    }
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
                {!isDeleting.delete &&
                  (post.content !== null ? (
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
                                canCloseModal();
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
                  ) : null)}
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
          {user && (
            <CommentEditor
              user={user}
              placeholder={"답글을 작성해주세요."}
              onSubmit={async (content) => {
                return onSubmitComment?.(content, post.id).then(() => {
                  mutateCommentList();
                  if (content !== "<p></p>") {
                    showNotification("답글 등록 완료", "답글이 성공적으로 등록되었습니다.");
                    toggleEditor();
                  }
                  commentOpen ? null : toggleComment();
                });
              }}
            />
          )}
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
              return data.data.data.map((data) => (
                <Comment
                  key={data.id}
                  post={data}
                  mutateReply={() => {
                    mutateComment();
                    mutateCommentList();
                  }}
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
