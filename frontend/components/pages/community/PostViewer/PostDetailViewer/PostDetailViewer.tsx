import { Stack, Title, TypographyStylesProvider } from "@mantine/core";
import { usePostDetailViewerStyles } from "./PostDetailViewer.styles";
import PostHeader from "../PostHeader/PostHeader";
import PostFooter from "./PostFooter/PostFooter";
import CardContainer from "../../../../common/CardContainer/CardContainer";
import CommentSection from "./CommentSection/CommentSection";
import { Board } from "../../../../../types/api/boards";
import { uploadPost } from "../../../../../utils/api/uploadPost";
import React, { useContext, useState } from "react";
import { CheckIsliking, onLikeClick } from "../../../../../utils/api/onLikeClick";
import { CommunityContext } from "../../../../../pages/community";
import useAuth from "../../../../../hooks/useAuth";
import { useDisclosure } from "@mantine/hooks";

export interface PostDetailViewerProps {
  post: Board;
}

function PostDetailViewer({ post }: PostDetailViewerProps) {
  const { classes } = usePostDetailViewerStyles();
  const [commentEditorOpened, { toggle: toggleCommentEditor }] = useDisclosure(false);
  const { token, user } = useAuth();

  // boards/likedUsers에 현재 user-id가 들어있는 지 확인
  const isliking = user
    ? CheckIsliking({
        likedUsers: post.likedUsers,
        userEmail: user.id,
      })
    : false;

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
            onLikeClick({ boardId: post.id, token })
              .then(() => {
                mutatePost();
              })
              .catch((error) => {
                // 오류 처리
              });
          }}
          categoryType={post.categoryTypes}
          commentCount={post.child}
          likeCount={post.like}
          isliking={isliking}
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
