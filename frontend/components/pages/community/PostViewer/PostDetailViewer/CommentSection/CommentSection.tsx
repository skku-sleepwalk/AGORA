import { Collapse, Stack } from "@mantine/core";
import CommentEditor from "./CommentEditor/CommentEditor";
import Comment from "./Comment/Comment";
import { MOCKUP_USER } from "../../../../../../mockups/user";
import { useCommentSectionStyles } from "./CommentSection.styles";

interface CommentSectionProps {
  editorOpen: boolean;
}

function CommentSection({ editorOpen }: CommentSectionProps) {
  const { classes } = useCommentSectionStyles();

  return (
    <Stack spacing={0} className={classes.commentSection}>
      <Collapse in={editorOpen}>
        <CommentEditor user={MOCKUP_USER} />
      </Collapse>
      <Comment user={MOCKUP_USER}>
        <Comment user={MOCKUP_USER} />
      </Comment>
      <Comment user={MOCKUP_USER}>
        <Comment user={MOCKUP_USER}>
          <Comment user={MOCKUP_USER} />
        </Comment>
        <Comment user={MOCKUP_USER} />
        <Comment user={MOCKUP_USER}>
          <Comment user={MOCKUP_USER} />
          <Comment user={MOCKUP_USER} />
        </Comment>
      </Comment>
      <Comment user={MOCKUP_USER} />
      <Comment user={MOCKUP_USER} />
    </Stack>
  );
}

export default CommentSection;
