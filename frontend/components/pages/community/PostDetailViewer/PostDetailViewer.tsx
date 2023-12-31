import {
  Alert,
  Button,
  Group,
  MultiSelect,
  Stack,
  TextInput,
  Title,
  Text,
  TypographyStylesProvider,
  useMantineTheme,
} from "@mantine/core";
import { usePostDetailViewerStyles } from "./PostDetailViewer.styles";
import PostHeader from "../PostHeader/PostHeader";
import CardContainer from "../../../common/CardContainer/CardContainer";
import CommentSection from "./CommentSection/CommentSection";
import { Board } from "../../../../types/api/boards";
import { uploadPost } from "../../../../utils/api/uploadPost";
import React, { createContext, useContext, useRef } from "react";
import { onLikeClick } from "../../../../utils/api/onLikeClick";
import { CommunityContext } from "../../../../pages/community";
import useAuth from "../../../../hooks/useAuth";
import { useDisclosure, useSetState } from "@mantine/hooks";
import { CategoryNum, Values } from "../../../../constants/category";
import { useForm } from "@mantine/form";
import { Editor } from "@tiptap/react";
import { patchPost } from "../../../../utils/api/patchPost";
import { showNotification } from "../../../../utils/notifications";
import RichEditor from "../PostWriter/RichEditor/RichEditor";
import CategorySelector from "../PostWriter/CategorySelector/CategorySelector";
import { IconAlertCircle, IconChevronLeft } from "@tabler/icons-react";
import { mutate } from "swr";
import { ButtonProgress } from "../PostWriter/ButtonProgress/ButtonProgress";
import PostFooter from "./PostFooter/PostFooter";
import { ModalContext, provideText } from "../PostViewer/PostViewer";
import InvisibleButton from "../../../common/InvisibleButton/InvisibleButton";
import { useRouter } from "next/router";

export const PostContext = createContext({
  mutatePostDetail: () => {},
});

export interface PostDetailViewerProps {
  post: Board;
  // close: Function;
}

function PostDetailViewer({ post }: PostDetailViewerProps) {
  const { classes } = usePostDetailViewerStyles();
  const theme = useMantineTheme();

  const { token, user, openSignInModal } = useAuth();
  const router = useRouter();
  const [editorOpen, { toggle: toggleEditor }] = useDisclosure(true);

  // 모든 Category 이름 배열로 반환
  const data: string[] = [];
  for (let i = 0; i < CategoryNum; i++) {
    const values = Values[i];
    values.forEach((value) => {
      data.push(value.label);
    });
  }

  // boards/likedUsers에 현재 user-id가 들어있는 지 확인
  const isliking = post.like;

  // Edit 관련
  const [isEditing, setIsEditing] = useSetState({ Edit: false, cancel: false });
  const form = useForm({
    initialValues: {
      title: post.title ? post.title : "",
      category: post.categories.map((item) => item.name),
    },
  });
  const editorRef = useRef<Editor>(null);
  const { canCloseModal } = useContext(ModalContext);

  // post가 post인지 child인지 확인
  const postType = post.parent ? "child" : "post";

  const mutatePostDetail = async () => {
    mutate(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/community/board/${post.id}`);
  };

  return (
    <PostContext.Provider value={{ mutatePostDetail }}>
      <CardContainer className={classes.postContainer}>
        <Stack spacing={15}>
          <Stack spacing={14}>
            {postType === "child" && (
              <InvisibleButton
                center={false}
                onClick={(e) => {
                  e.stopPropagation();
                  router.replace(`/community/${post.parent?.id}`);
                }}
              >
                <Group spacing={0}>
                  <IconChevronLeft color="#228be6" />
                  {provideText(post)}
                </Group>
              </InvisibleButton>
            )}
            {post.author !== null ? <PostHeader user={post.author} date={post.createdAt} /> : null}
            {!isEditing.Edit && (
              <Stack spacing={7}>
                <Title order={3}>{post.title}</Title>
                {post.content !== null ? (
                  <TypographyStylesProvider>
                    <div
                      className={classes.content}
                      dangerouslySetInnerHTML={{
                        __html: post.content,
                      }}
                    />
                  </TypographyStylesProvider>
                ) : (
                  <Text color={theme.colors.gray[4]}>(삭제된 게시물 입니다.)</Text>
                )}
              </Stack>
            )}
            {isEditing.Edit && (
              <form
                onSubmit={form.onSubmit((values) => {
                  const content = editorRef.current!.getHTML();
                  const postData = {
                    ...values,
                    content,
                  };
                  if (postData.category.length === 0) {
                    showNotification("카테고리 없음", "카테고리를 1개 이상 추가해주세요.");
                  } else if (postData.content === "<p></p>") {
                    showNotification("본문 없음", "본문 내용을 추가해주세요.");
                  } else if (postData.title === "") {
                    showNotification("제목 없음", "제목을 추가해주세요.");
                  } else {
                    patchPost({
                      data: {
                        boardId: post.id,
                        data: {
                          title: postData.title,
                          content: postData.content,
                          categoryNames: postData.category,
                        },
                        token,
                      },
                    }).then(() => {
                      showNotification("업로드 완료", "게시물이 성공적으로 수정되었습니다.");
                      setIsEditing({ Edit: false });
                      mutatePostDetail();
                    });
                  }
                })}
              >
                <Stack className={classes.editorContainer} spacing={17}>
                  <TextInput
                    placeholder="멋진 제목을 입력해주세요."
                    data-autofocus
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                      }
                    }}
                    {...form.getInputProps("title")}
                  />
                  <RichEditor ref={editorRef} content={post.content} />
                  <CategorySelector
                    defaultValue={post.categories.map((item) => item.name)}
                    onChange={(category) => {
                      form.setFieldValue("category", category);
                    }}
                  />
                  {isEditing.cancel && (
                    <Alert
                      icon={<IconAlertCircle size="1rem" />}
                      title="게시글 수정을 취소하시겠습니까?"
                      color="red"
                      withCloseButton
                      onClose={() => {
                        setIsEditing({ cancel: false });
                      }}
                    >
                      <Stack spacing={"xs"}>
                        게시글 수정을 취소하면 현재 수정된 내용을 모두 잃습니다.
                        <Group position="right">
                          <Button
                            variant="light"
                            color="gray"
                            className={classes.cancelButton}
                            onClick={() => {
                              setIsEditing({ Edit: false });
                              setIsEditing({ cancel: false });
                              canCloseModal();
                            }}
                          >
                            취소
                          </Button>
                        </Group>
                      </Stack>
                    </Alert>
                  )}
                  {!isEditing.cancel && (
                    <Group position="right" spacing={"sm"}>
                      <Button
                        className={classes.editButton}
                        variant="light"
                        color="gray"
                        onClick={() => {
                          setIsEditing({ cancel: true });
                        }}
                      >
                        취소
                      </Button>
                      <ButtonProgress
                        text="수정"
                        type="submit"
                        className={classes.editButton}
                        onClick={() => {
                          canCloseModal();
                        }}
                      />
                    </Group>
                  )}
                </Stack>
              </form>
            )}
          </Stack>
          <Stack spacing={0}>
            {!isEditing.Edit && (
              <MultiSelect
                className={classes.multiSelect}
                data={data}
                value={post.categories.map((item) => item.name)}
                readOnly
              />
            )}
            <PostFooter
              onCommentClick={() => {
                toggleEditor();
              }}
              onLikeClick={() => {
                if (!user) {
                  openSignInModal();
                  return;
                }
                onLikeClick(
                  {
                    data: {
                      boardId: post.id,
                      token,
                    },
                  },
                  isliking
                )
                  .then(() => {
                    mutatePostDetail();
                  })
                  .catch((error) => {
                    // 오류 처리
                  });
              }}
              onEditClick={() => {
                setIsEditing({ Edit: true });
                canCloseModal();
              }}
              postId={post.id}
              // closeFunction={close}
              commentCount={post.childCount}
              likeCount={post.likeCount}
              isliking={isliking}
              isEditing={post.content !== null ? isEditing.Edit : true}
              canEdit={user && post.author !== null ? post.author.id === user.id : false}
            />
          </Stack>
          <CommentSection
            parentId={post.id}
            categoryNames={post.categories.map((category) => category.name)}
            editorOpen={editorOpen}
            onSubmitComment={async (content, parentId) => {
              if (content === "<p></p>") {
                return showNotification("댓글 없음", "댓글 내용을 입력해 주세요.");
              } else {
                return uploadPost(
                  {
                    content,
                    parentId,
                    categoryNames: post.categories.map((category) => category.name),
                  },
                  token
                );
              }
            }}
          />
        </Stack>
      </CardContainer>
    </PostContext.Provider>
  );
}

export default PostDetailViewer;
