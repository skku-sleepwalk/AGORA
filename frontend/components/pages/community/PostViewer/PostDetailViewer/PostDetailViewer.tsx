import { Container, Stack, Title, TypographyStylesProvider } from "@mantine/core";
import { usePostDetailViewerStyles } from "./PostDetailViewer.styles";
import PostHeader from "../PostHeader/PostHeader";
import PostFooter from "./PostFooter/PostFooter";
import CardContainer from "../../../../common/CardContainer/CardContainer";
import { User } from "../../../../../types/user";
import CommentEditor from "./CommentSection/CommentEditor/CommentEditor";
import Comment from "./CommentSection/Comment/Comment";
import { MOCKUP_USER } from "../../../../../mockups/user";
import CommentSection from "./CommentSection/CommentSection";
import { useDisclosure } from "@mantine/hooks";

export interface PostDetailViewerProps {
  title?: string;
  content: string;
  user: User;
  date: string;
}

function PostDetailViewer({ title, content, user, date }: PostDetailViewerProps) {
  const { classes } = usePostDetailViewerStyles();
  const [commentEditorOpened, { toggle: toggleCommentEditor }] = useDisclosure(false);

  return (
    <CardContainer className={classes.postContainer}>
      <Stack spacing={15}>
        <Stack spacing={14}>
          <PostHeader user={user} date={date} />
          <Stack spacing={7}>
            <Title order={3}>{title}</Title>
            <TypographyStylesProvider>
              <div className={classes.content} dangerouslySetInnerHTML={{ __html: content }} />
            </TypographyStylesProvider>
          </Stack>
        </Stack>
        <PostFooter onEditClick={toggleCommentEditor} onCommentClick={toggleCommentEditor} />
        <CommentSection editorOpen={commentEditorOpened} />
      </Stack>
    </CardContainer>
  );
}

export default PostDetailViewer;
