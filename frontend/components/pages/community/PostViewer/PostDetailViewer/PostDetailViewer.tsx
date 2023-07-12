import { Stack, Title, TypographyStylesProvider } from "@mantine/core";
import { usePostDetailViewerStyles } from "./PostDetailViewer.styles";
import PostHeader from "../PostHeader/PostHeader";
import PostFooter from "./PostFooter/PostFooter";
import CardContainer from "../../../../common/CardContainer/CardContainer";
import CommentSection from "./CommentSection/CommentSection";
import { useDisclosure } from "@mantine/hooks";
import { Board } from "../../../../../types/api/boards";
import { uploadPost } from "../../../../../utils/api/uploadPost";
import React, { useContext, useState } from "react";
import { CheckIsliking, onLikeClick } from "../../../../../utils/api/onLikeClick";
import { CommunityContext } from "../../../../../pages/community";

export interface PostDetailViewerProps {
  post: Board;
}

function PostDetailViewer({ post }: PostDetailViewerProps) {
  const { classes } = usePostDetailViewerStyles();
  const [commentEditorOpened, { toggle: toggleCommentEditor }] = useDisclosure(false);

  // boards/likedUsers에 현재 user-id가 들어있는 지 확인
  const isliking = CheckIsliking({
    likedUsers: post.likedUsers,
    userId: "74c29399-c762-4246-a694-25b373dc0a9a",
  });

  const { mutatePost } = useContext(CommunityContext);

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
            onLikeClick({ boardId: post.id, userId: "74c29399-c762-4246-a694-25b373dc0a9a" })
              .then(() => {
                mutatePost();
              })
              .catch((error) => {
                // 오류 처리
              });
          }}
          commentCount={post.child}
          likeCount={post.like}
          isliking={isliking}
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
