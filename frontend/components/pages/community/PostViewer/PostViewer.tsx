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
import { useClickOutside, useDisclosure, useSetState } from "@mantine/hooks";
import PostDetailViewer from "./PostDetailViewer/PostDetailViewer";
import CardContainer from "../../../common/CardContainer/CardContainer";
import { Board } from "../../../../types/api/boards";
import { PhotoViewer } from "../../../common/PhotoViewer/PhotoViewer";
import { extractImageSrc, removeImgTags } from "../../../../utils/api/ViewPhotos";
import { createContext } from "react";
import { showError } from "../../../../utils/notifications";

export interface PostViewerProps {
  post: Board;
  thumbnailUrl?: string;
}

export const ModalContext = createContext({
  canCloseModal: () => {},
});

function PostViewer({ post, thumbnailUrl }: PostViewerProps) {
  const maxContentHeight = thumbnailUrl ? 50 : 150;
  const { classes } = usePostViewerStyles({ maxContentHeight });
  const [opened, { open, close }] = useDisclosure(false); // modal of PostDetailViewer
  const [state, setState] = useSetState({ modalClickOutside: true });
  const canCloseModal = () => {
    setState((prevState) => ({
      modalClickOutside: !prevState.modalClickOutside,
    }));
  };
  const modalRef = useClickOutside(() => {
    if (state.modalClickOutside === false) {
      showError("수정 중에는 게시글을 떠날 수 없습니다.", null);
    }
  });

  const [opening, handlers] = useDisclosure(false); // modal of PhotoViewer

  const imageSrcArray = extractImageSrc(post.content);
  const removeImgTag = removeImgTags(post.content);

  return (
    <ModalContext.Provider
      value={{
        canCloseModal,
      }}
    >
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
      <Modal
        opened={opened}
        onClose={close}
        className={classes.modal}
        size="auto"
        centered
        scrollAreaComponent={ScrollArea.Autosize}
        closeOnClickOutside={state.modalClickOutside}
      >
        <div ref={modalRef}>
          <PostDetailViewer post={post} close={close} />
        </div>
      </Modal>
    </ModalContext.Provider>
  );
}

export default PostViewer;
