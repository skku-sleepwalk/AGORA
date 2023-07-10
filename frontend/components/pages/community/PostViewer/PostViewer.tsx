import {
  Stack,
  Modal,
  Title,
  TypographyStylesProvider,
  Container,
  Image,
  UnstyledButton,
  ScrollArea,
} from "@mantine/core";
import PostHeader from "./PostHeader/PostHeader";
import { usePostViewerStyles } from "./PostViewer.styles";
import { useDisclosure } from "@mantine/hooks";
import PostDetailViewer from "./PostDetailViewer/PostDetailViewer";
import CardContainer from "../../../common/CardContainer/CardContainer";
import { Board } from "../../../../types/api/boards";

export interface PostViewerProps {
  post: Board;
  thumbnailUrl?: string;
}

function PostViewer({ post, thumbnailUrl }: PostViewerProps) {
  const maxContentHeight = thumbnailUrl ? 50 : 150;
  const { classes } = usePostViewerStyles({ maxContentHeight });
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <UnstyledButton onClick={open}>
        <CardContainer className={classes.postContainer}>
          <Stack spacing={14}>
            <PostHeader user={post.writer} date={post.createdAt} />
            <Stack spacing={7}>
              <Title order={3}>{post.title}</Title>
              <Container className={classes.contentWrapper}>
                <TypographyStylesProvider>
                  <div
                    className={classes.content}
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />
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
      </UnstyledButton>
      <Modal
        opened={opened}
        onClose={close}
        className={classes.modal}
        size="auto"
        centered
        scrollAreaComponent={ScrollArea.Autosize}
      >
        <PostDetailViewer post={post} />
      </Modal>
    </>
  );
}

export default PostViewer;
