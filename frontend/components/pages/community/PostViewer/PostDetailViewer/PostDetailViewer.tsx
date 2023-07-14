import { Button, Group, MultiSelect, Stack, TextInput, Title, TypographyStylesProvider } from "@mantine/core";
import { usePostDetailViewerStyles } from "./PostDetailViewer.styles";
import PostHeader from "../PostHeader/PostHeader";
import PostFooter from "./PostFooter/PostFooter";
import CardContainer from "../../../../common/CardContainer/CardContainer";
import CommentSection from "./CommentSection/CommentSection";
import { Board } from "../../../../../types/api/boards";
import { uploadPost } from "../../../../../utils/api/uploadPost";
import React, { useContext, useRef } from "react";
import { CheckIsliking, onLikeClick } from "../../../../../utils/api/onLikeClick";
import { CommunityContext } from "../../../../../pages/community";
import useAuth from "../../../../../hooks/useAuth";
import { useSetState } from "@mantine/hooks";
import RichEditor, { RichEditorProps } from "../../PostWriter/RichEditor/RichEditor";
import CategorySelector from "../../PostWriter/CategorySelector/CategorySelector";
import { Editor } from "@tiptap/react";
import { useForm } from "@mantine/form";
import { showNotification } from "../../../../../utils/notifications";
import { ButtonProgress } from "../../PostWriter/ButtonProgress/ButtonProgress";
import { patchPost } from "../../../../../utils/api/patchPost";
import { CategoryNum, Values } from "../../../../../constants/category";

export interface PostDetailViewerProps {
  post: Board;
}

function PostDetailViewer({ post }: PostDetailViewerProps) {
  const { classes } = usePostDetailViewerStyles();
  const { token, user } = useAuth();

  // 모든 Category 이름 배열로 반환
  let data = new Array();
  for (let i = 0; i < CategoryNum; i++) {
    const values = Values[i];
    values.map((value) => {
      data.push(value.label);
    });
  }

  // boards/likedUsers에 현재 user-id가 들어있는 지 확인
  const isliking = user
    ? CheckIsliking({
        likedUsers: post.likedUsers,
        userEmail: user.id,
      })
    : false;
  
  // Edit 관련
  const [isEditing, setIsEditing] = useSetState({ Edit: false });
  const form = useForm({
    initialValues: {
      title: post.title? post.title: "",
      category: post.categoryTypes.map((item) => item.name),
    },
  });
  const editorRef = useRef<Editor>(null);
  const initialContent: RichEditorProps = {
    content: post.content,
  }

  const { mutatePost } = useContext(CommunityContext);

  return (
    <CardContainer className={classes.postContainer}>
      <Stack spacing={15}>
        <Stack spacing={14}>
          <PostHeader user={post.writer} date={post.createdAt} />
          {!isEditing.Edit &&
            <Stack spacing={7}>
              <Title order={3}>{post.title}</Title>
              <TypographyStylesProvider>
                <div className={classes.content} dangerouslySetInnerHTML={{ __html: post.content }} />
              </TypographyStylesProvider>
            </Stack>
          }
          {isEditing.Edit &&
            <form
              onSubmit={form.onSubmit((values) => {
                const content = editorRef.current!.getHTML();
                const postData = {
                  ...values,
                  content,
                };

                patchPost({
                  boardId: post.id,
                  data:{
                    title: postData.title,
                    content: postData.content,
                    categoryNames: postData.category,
                  },
                  token
                }
                ).then(() => {
                  showNotification("업로드 완료", "게시물이 성공적으로 수정되었습니다.");
                  setIsEditing({Edit: false});
                  mutatePost();
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
                <RichEditor ref={editorRef} {...initialContent}/>
                <CategorySelector
                  defaultValue={post.categoryTypes.map((item) => item.name)}
                  onChange={(category) => {
                    form.setFieldValue("category", category);
                  }}
                />
                <Group position="right" spacing={'sm'}>
                  <Button className={classes.editButton}
                    variant="light" color="gray"
                    onClick={() => {
                      setIsEditing({Edit: false});
                    }}
                    > 취소 </Button>
                  <ButtonProgress text="수정" type="submit" 
                    className={classes.editButton}
                  />
                </Group>
              </Stack>
            </form>
          }
        </Stack>
        {!isEditing.Edit && 
          <MultiSelect
          className={classes.multiSelect}
          data={data}
          defaultValue={post.categoryTypes.map((item) => item.name)}
          readOnly
          />
        }
        <PostFooter
          onLikeClick={() => {
            onLikeClick({ boardId: post.id, token })
              .then(() => {
                mutatePost();
              })
              .catch((error) => {
                // 오류 처리
              });
          }}
          onEditClick={() => {
            setIsEditing({Edit: true});
          }}
          commentCount={post.child}
          likeCount={post.like}
          isliking={isliking}
          isEditing={isEditing.Edit}
          canEdit={user? post.writer.id === user.id: false}
        />
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
