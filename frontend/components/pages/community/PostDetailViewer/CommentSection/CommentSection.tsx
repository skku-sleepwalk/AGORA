import { Center, Collapse, Loader, Stack, Text } from "@mantine/core";
import CommentEditor from "./CommentEditor/CommentEditor";
import Comment from "./Comment/Comment";
import { MOCKUP_USER } from "../../../../../mockups/user";
import { useCommentSectionStyles } from "./CommentSection.styles";
import useBoardList from "../../../../../hooks/useBoardList";
import { createContext, useContext, useEffect } from "react";
import InvisibleButton from "../../../../common/InvisibleButton/InvisibleButton";
import { showNotification } from "../../../../../utils/notifications";
import { CommunityContext } from "../../../../../pages/community";

interface CommentSectionProps {
  parentId: string;
  categoryNames: string[];
  editorOpen: boolean;
  onSubmitComment?: (content: string, parentId: string) => Promise<any>;
}

export const CommentContext = createContext({
  mutateComment: () => {},
});

function CommentSection({
  parentId,
  categoryNames,
  editorOpen,
  onSubmitComment,
}: CommentSectionProps) {
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
    <CommentContext.Provider
      value={{
        mutateComment,
      }}
    >
      <Stack spacing={0} className={classes.commentSection}>
        <Collapse in={editorOpen}>
          <CommentEditor
            user={MOCKUP_USER}
            placeholder={"댓글을 작성해주세요."}
            onSubmit={async (content) => {
              if (content === "<p></p>") {
                return showNotification("댓글 내용 없음", "댓글 내용을 작성해주세요.");
              } else {
                return onSubmitComment?.(content, parentId).then(() => {
                  mutateComment();
                  mutatePost();
                  showNotification("댓글 등록 완료", "댓글이 성공적으로 등록되었습니다.");
                });
              }
            }}
          />
        </Collapse>
        {commentData?.map((data) => {
          return data.data.data.map((data) => (
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
    </CommentContext.Provider>
  );
}

export default CommentSection;
