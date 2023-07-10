import { Stack, Title, TypographyStylesProvider } from "@mantine/core";
import { usePostDetailViewerStyles } from "./PostDetailViewer.styles";
import PostHeader from "../PostHeader/PostHeader";
import PostFooter from "./PostFooter/PostFooter";
import CardContainer from "../../../../common/CardContainer/CardContainer";
import CommentSection from "./CommentSection/CommentSection";
import { useDisclosure } from "@mantine/hooks";
import { Board } from "../../../../../types/api/boards";
import { uploadPost } from "../../../../../utils/api/uploadPost";

export interface PostDetailViewerProps {
  post: Board;
}

function PostDetailViewer({ post }: PostDetailViewerProps) {
  const { classes } = usePostDetailViewerStyles();
  const [commentEditorOpened, { toggle: toggleCommentEditor }] = useDisclosure(false);

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
        <PostFooter onEditClick={toggleCommentEditor} onCommentClick={toggleCommentEditor} />
        <CommentSection
          editorOpen={commentEditorOpened}
          parentId={post.id}
          categoryNames={post.categoryTypes.map((category) => category.name)}
          onSubmitComment={(content, parentId) => {
            uploadPost({
              content,
              parentId,
              writerEmail: "qazxsw100415@gmail.com",
              categoryNames: post.categoryTypes.map((category) => category.name),
            });
          }}
        />
      </Stack>
    </CardContainer>
  );
}

export default PostDetailViewer;
