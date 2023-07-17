import {
  Stack,
  Modal,
  Title,
  TypographyStylesProvider,
  Container,
  Image,
  UnstyledButton,
} from "@mantine/core";
import PostHeader from "../PostHeader/PostHeader";
import { usePostViewerStyles } from "./PostViewer.styles";
import { useDisclosure } from "@mantine/hooks";
import CardContainer from "../../../common/CardContainer/CardContainer";
import { Board } from "../../../../types/api/boards";
import { PhotoViewer } from "../../../common/PhotoViewer/PhotoViewer";
import { extractImageSrc, removeImgTags } from "../../../../utils/api/ViewPhotos";
import { useRouter } from "next/router";

export interface PostViewerProps {
  post: Board;
  thumbnailUrl?: string;
}

function PostViewer({ post, thumbnailUrl }: PostViewerProps) {
  const maxContentHeight = thumbnailUrl ? 50 : 150;
  const { classes } = usePostViewerStyles({ maxContentHeight });
  const [opening, handlers] = useDisclosure(false); // modal of PhotoViewer
  const router = useRouter();

  const imageSrcArray = extractImageSrc(post.content);
  const removeImgTag = removeImgTags(post.content);

  return (
    <UnstyledButton
      onClick={() => {
        router.push(`/community/${post.id}`);
      }}
    >
      <CardContainer className={classes.postContainer}>
        <Stack spacing={14}>
          <PostHeader user={post.writer} date={post.createdAt} />
          <Stack spacing={7}>
            <Title order={3}>{post.title}</Title>
            <Container className={classes.contentWrapper}>
              <TypographyStylesProvider>
                <div
                  className={classes.content}
                  dangerouslySetInnerHTML={{ __html: removeImgTag }}
                />
              </TypographyStylesProvider>
            </Container>
            {thumbnailUrl && (
              <>
                <Modal
                  opened={opening}
                  onClose={handlers.close}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  size={"49.375rem"}
                  padding={0}
                  centered
                  className={classes.imageModal}
                  withCloseButton={false}
                >
                  <PhotoViewer imageSrc={imageSrcArray} />
                </Modal>
                <Image
                  onClick={(e) => {
                    e.stopPropagation();
                    handlers.open();
                  }}
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
  );
}

export default PostViewer;
