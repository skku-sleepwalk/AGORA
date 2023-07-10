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
import { User } from "../../../../types/user";
import { PhotoViewer } from "../../../common/PhotoViewer/PhotoViewer";

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
  const [opened, { open, close }] = useDisclosure(false); // modal of PostDetailViewer
  const [opening, handlers] = useDisclosure(false); // modal of PhotoViewer

  return (
    <>
      <UnstyledButton onClick={open}>
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
                <>
                  <Modal opened={opening} onClose={handlers.close}
                    onClick = {(e) => { e.stopPropagation()}}
                    size={'49.375rem'}
                    padding={0}
                    centered
                    className={classes.imageModal}
                    withCloseButton={false}>
                      <PhotoViewer/>
                  </Modal>
                  <Image
                    onClick = {(e) => { e.stopPropagation(); handlers.open()}}
                    src={thumbnailUrl}
                    alt="thumbnail"
                    width="100%"
                    height={300}
                    fit="contain"
                    className={classes.thumbnail}
                  />
                </>
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
        <PostDetailViewer content={content} user={user} date={date} title={title} />
      </Modal>
    </>
  );
}

export default PostViewer;
