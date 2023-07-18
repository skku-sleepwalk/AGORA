import {
  Alert,
  Button,
  Group,
  MultiSelect,
  Stack,
  TextInput,
  Title,
  TypographyStylesProvider,
} from "@mantine/core";
import { usePostDetailViewerStyles } from "./PostDetailViewer.styles";
import PostHeader from "../PostHeader/PostHeader";
import CardContainer from "../../../common/CardContainer/CardContainer";
import CommentSection from "./CommentSection/CommentSection";
import { Board } from "../../../../types/api/boards";
import { uploadPost } from "../../../../utils/api/uploadPost";
import React, { useContext, useRef, useState } from "react";
import { CheckIsliking, onLikeClick } from "../../../../utils/api/onLikeClick";
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
import { IconAlertCircle } from "@tabler/icons-react";
import { mutate } from "swr";
import { ButtonProgress } from "../PostWriter/ButtonProgress/ButtonProgress";
import PostFooter from "./PostFooter/PostFooter";
import { ModalContext } from "../PostViewer/PostViewer";

export interface PostDetailViewerProps {
  post: Board;
  // close: Function;
}

function PostDetailViewer({ post }: PostDetailViewerProps) {
  const { classes } = usePostDetailViewerStyles();
  const { token, user } = useAuth();

  // 모든 Category 이름 배열로 반환
  const data: string[] = [];
  for (let i = 0; i < CategoryNum; i++) {
    const values = Values[i];
    values.forEach((value) => {
      data.push(value.label);
    });
  }

  // boards/likedUsers에 현재 user-id가 들어있는 지 확인
  const isliking = user
    ? CheckIsliking({
        likedUsers: post.likedUsers,
        userId: user.id,
      })
    : false;

  // Edit 관련
  const [isEditing, setIsEditing] = useSetState({ Edit: false, cancel: false });
  const form = useForm({
    initialValues: {
      title: post.title ? post.title : "",
      category: post.categoryTypes.map((item) => item.name),
    },
  });
  const editorRef = useRef<Editor>(null);
  const { canCloseModal } = useContext(ModalContext);

  const { mutatePost } = useContext(CommunityContext);

  const postData: Board = post;
  const mutatePostDetail = async () => {
    mutate(`http://localhost:8000/developer-community-boards/id/${post.id}`, postData);
    post = postData;
  };

  return (
    <CardContainer className={classes.postContainer}>
      <Stack spacing={15}>
        <Stack spacing={14}>
          <PostHeader user={post.writer} date={post.createdAt} />
          {!isEditing.Edit && (
            <Stack spacing={7}>
              <Title order={3}>{post.title}</Title>
              <TypographyStylesProvider>
                <div
                  className={classes.content}
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </TypographyStylesProvider>
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

                patchPost({
                  boardId: post.id,
                  data: {
                    title: postData.title,
                    content: postData.content,
                    categoryNames: postData.category,
                  },
                  token,
                }).then(() => {
                  showNotification("업로드 완료", "게시물이 성공적으로 수정되었습니다.");
                  setIsEditing({ Edit: false });
                  mutatePost();
                  mutatePostDetail();
                });
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
                  defaultValue={post.categoryTypes.map((item) => item.name)}
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
              value={post.categoryTypes.map((item) => item.name)}
              readOnly
            />
          )}
          <PostFooter
            onLikeClick={() => {
              onLikeClick({ boardId: post.id, token })
                .then(() => {
                  mutatePost();
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
            commentCount={post.child}
            likeCount={post.like}
            isliking={isliking}
            isEditing={isEditing.Edit}
            canEdit={user ? post.writer.id === user.id : false}
          />
        </Stack>
        <CommentSection
          parentId={post.id}
          categoryNames={post.categoryTypes.map((category) => category.name)}
          onSubmitComment={async (content, parentId) => {
            return uploadPost(
              {
                content,
                parentId,
                categoryNames: post.categoryTypes.map((category) => category.name),
              },
              token
            );
          }}
        />
      </Stack>
    </CardContainer>
  );
}

export default PostDetailViewer;
