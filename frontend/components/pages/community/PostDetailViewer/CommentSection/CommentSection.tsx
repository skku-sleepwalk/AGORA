import { Center, Loader, Stack, Text } from "@mantine/core";
import CommentEditor from "./CommentEditor/CommentEditor";
import Comment from "./Comment/Comment";
import { MOCKUP_USER } from "../../../../../mockups/user";
import { useCommentSectionStyles } from "./CommentSection.styles";
import useBoardList from "../../../../../hooks/useBoardList";
import { useContext, useEffect } from "react";
import InvisibleButton from "../../../../common/InvisibleButton/InvisibleButton";
import { showNotification } from "../../../../../utils/notifications";
import { CommunityContext } from "../../../../../pages/community";

interface CommentSectionProps {
  parentId: string;
  categoryNames: string[];
  onSubmitComment?: (content: string, parentId: string) => Promise<any>;
}

function CommentSection({ parentId, categoryNames, onSubmitComment }: CommentSectionProps) {
  const { classes } = useCommentSectionStyles();
  const {
    data: commentData,
    setSize: setCommentSize,
    isLast: isLastComment,
    isLoading: isCommentLoading,
    mutate: mutateComment,
  } = useBoardList(categoryNames, {
    parentId,
  });
  const { mutatePost } = useContext(CommunityContext);

  useEffect(() => {
    setCommentSize(1);
  }, []);

  return (
    <Stack spacing={0} className={classes.commentSection}>
      <CommentEditor
        user={MOCKUP_USER}
        onSubmit={async (content) => {
          return onSubmitComment?.(content, parentId).then(() => {
            mutateComment();
            mutatePost();
            showNotification("댓글 등록 완료", "댓글이 성공적으로 등록되었습니다.");
          });
        }}
      />
      {commentData?.map((data) => {
        return data.data.map((data) => (
          <Comment
            key={data.id}
            post={data}
            onSubmitComment={async (content, parentId) => {
              return onSubmitComment?.(content, parentId);
            }}
          />
        ));
      })}
      {!isLastComment &&
        (isCommentLoading ? (
          <Center className={classes.moreButton}>
            <Loader size="sm" />
          </Center>
        ) : (
          <InvisibleButton
            onClick={() => {
              setCommentSize((prev) => prev + 1);
            }}
            className={classes.moreButton}
          >
            <Text color="gray" size="sm">
              댓글 더보기
            </Text>
          </InvisibleButton>
        ))}
    </Stack>
  );
}

export default CommentSection;
