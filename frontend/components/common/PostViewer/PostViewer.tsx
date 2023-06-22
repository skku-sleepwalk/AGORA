import { Stack, Text, Title, TypographyStylesProvider, Container, Image } from "@mantine/core";
import { User } from "../../../types/user";
import CardContainer from "../CardContainer/CardContainer";
import PostHeader from "./PostHeader/PostHeader";
import { usePostViewerStyles } from "./PostViewer.styles";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export interface PostViewerProps {
  content: string;
  thumbnailUrl?: string;
  title?: string;
  user: User;
  date: string;
}

function PostViewer({ content, thumbnailUrl, title, user, date }: PostViewerProps) {
  const maxContentHeight = thumbnailUrl ? 50 : 150;
  const { classes } = usePostViewerStyles({ maxContentHeight });

  return (
    <CardContainer className={classes.postContainer}>
      <Stack spacing={14}>
        <PostHeader user={user} date={date} />
        <Stack spacing={7}>
          <Title order={3}>{title}</Title>
          <Container className={classes.contentWrapper}>
            <TypographyStylesProvider>
              <div className={classes.content} dangerouslySetInnerHTML={{ __html: content }} />
            </TypographyStylesProvider>
          </Container>
          {thumbnailUrl && (
            <Image
              src={thumbnailUrl}
              alt="thumbnail"
              width="100%"
              height={300}
              fit="contain"
              className={classes.thumbnail}
            />
          )}
        </Stack>
      </Stack>
    </CardContainer>
  );
}

export default PostViewer;
