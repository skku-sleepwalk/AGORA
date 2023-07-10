import { Button, Collapse, Stack } from "@mantine/core";
import CommentEditor from "./CommentEditor/CommentEditor";
import Comment from "./Comment/Comment";
import { MOCKUP_USER } from "../../../../../../mockups/user";
import { useCommentSectionStyles } from "./CommentSection.styles";
import { MOCKUP_BOARD } from "../../../../../../mockups/post";
import useBoardList from "../../../../../../hooks/useBoardList";
import { useEffect, useState } from "react";

interface CommentSectionProps {
  editorOpen: boolean;
  parentId: string;
  categoryNames: string[];
  onSubmitComment?: (content: string, parentId: string) => void;
}

function CommentSection({
  editorOpen,
  parentId,
  categoryNames,
  onSubmitComment,
}: CommentSectionProps) {
  const { classes } = useCommentSectionStyles();
  const { data: commentData, setSize: setCommentSize } = useBoardList(categoryNames, {
    parentId,
  });

  useEffect(() => {
    setCommentSize(1);
  }, []);

  return (
    <Stack spacing={0} className={classes.commentSection}>
      <Collapse in={editorOpen}>
        <CommentEditor
          user={MOCKUP_USER}
          onSubmit={(content) => {
            onSubmitComment?.(content, parentId);
          }}
        />
      </Collapse>
      {commentData?.map((data) => {
        return data.data.map((data) => <Comment key={data.id} post={data} />);
      })}
      <Button
        onClick={() => {
          setCommentSize((prev) => prev + 1);
        }}
        color="gray"
      >
        더보기
      </Button>
    </Stack>
  );
}

export default CommentSection;
