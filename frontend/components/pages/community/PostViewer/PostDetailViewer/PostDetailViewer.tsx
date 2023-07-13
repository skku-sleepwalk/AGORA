import { Stack, Title, TypographyStylesProvider } from "@mantine/core";
import { usePostDetailViewerStyles } from "./PostDetailViewer.styles";
import PostHeader from "../PostHeader/PostHeader";
import PostFooter from "./PostFooter/PostFooter";
import CardContainer from "../../../../common/CardContainer/CardContainer";
import CommentSection from "./CommentSection/CommentSection";
import { Board } from "../../../../../types/api/boards";
import { uploadPost } from "../../../../../utils/api/uploadPost";
import React, { useContext } from 'react';
import { CheckIsliking, onLikeClick } from "../../../../../utils/api/onLikeClick";
import { CommunityContext } from "../../../../../pages/community";

export interface PostDetailViewerProps {
  post: Board;
}

function PostDetailViewer({ post }: PostDetailViewerProps) {
  const { classes } = usePostDetailViewerStyles();

  // boards/likedUsers에 현재 user-id가 들어있는 지 확인
  const isliking = CheckIsliking({likedUsers: post.likedUsers, userEmail: "04smailing@naver.com"});

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
            onLikeClick={() => {
              onLikeClick({boardId: post.id, userEmail: "04smailing@naver.com"})
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
