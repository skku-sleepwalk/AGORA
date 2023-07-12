import { Stack, Title, TypographyStylesProvider } from "@mantine/core";
import { usePostDetailViewerStyles } from "./PostDetailViewer.styles";
import PostHeader from "../PostHeader/PostHeader";
import PostFooter from "./PostFooter/PostFooter";
import CardContainer from "../../../../common/CardContainer/CardContainer";
import CommentSection from "./CommentSection/CommentSection";
import { useDisclosure } from "@mantine/hooks";
import { Board } from "../../../../../types/api/boards";
import { uploadPost } from "../../../../../utils/api/uploadPost";
import React, { useState } from 'react';
import { onLikeClick } from "../../../../../utils/api/onLikeClick";

export interface PostDetailViewerProps {
  post: Board;
}

function PostDetailViewer({ post }: PostDetailViewerProps) {
  const { classes } = usePostDetailViewerStyles();
  const [commentEditorOpened, { toggle: toggleCommentEditor }] = useDisclosure(false);
  const [likeCounting, setCount] = useState(post.like);

  return (
    <CardContainer className={classes.postContainer}>
      <Stack spacing={15}>
        <Stack spacing={14}>
          <PostHeader user={post.writer} date={post.createdAt} />
          <Stack spacing={7}>
            <Title order={3}>{post.title}</Title>
            <TypographyStylesProvider>
              <div className={classes.content} dangerouslySetInnerHTML={{ __html: post.content }} />
            </TypographyStylesProvider>
          </Stack>
        </Stack>
        <PostFooter
          onEditClick={toggleCommentEditor}
          onCommentClick={toggleCommentEditor}
          onLikeClick={() => {
            onLikeClick({boardId: post.id, userId: "b471af9f-0ce6-404a-a119-229b0bf38149"})
              .then((data) => {
                // 성공적으로 응답을 받았을 때의 동작
                alert(data);
              })
              .catch((error) => {
                // 오류 처리
                alert(error);
              }); }}
          commentCount={post.child}
          likeCount={likeCounting}
        />
        <CommentSection
          editorOpen={commentEditorOpened}
          parentId={post.id}
          categoryNames={post.categoryTypes.map((category) => category.name)}
          onSubmitComment={async (content, parentId) => {
            return uploadPost({
              content,
              parentId,
              writerEmail: "lucas@naver.com",
              categoryNames: post.categoryTypes.map((category) => category.name),
            });
          }}
        />
      </Stack>
    </CardContainer>
  );
}

export default PostDetailViewer;
