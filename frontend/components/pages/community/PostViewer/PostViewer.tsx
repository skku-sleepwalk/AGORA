import {
  Stack,
  Modal,
  Title,
  TypographyStylesProvider,
  Text,
  Container,
  Image,
  UnstyledButton,
  MultiSelect,
  Group,
} from "@mantine/core";
import PostHeader from "../PostHeader/PostHeader";
import { usePostViewerStyles } from "./PostViewer.styles";
import { useClickOutside, useDisclosure, useSetState } from "@mantine/hooks";
import CardContainer from "../../../common/CardContainer/CardContainer";
import { Board } from "../../../../types/api/boards";
import { PhotoViewer } from "../../../common/PhotoViewer/PhotoViewer";
import { extractImageSrc, removeImgTags } from "../../../../utils/api/ViewPhotos";
import { useRouter } from "next/router";
import { createContext, useContext } from "react";
import { CategoryNum, Values } from "../../../../constants/category";
import { CheckIsliking, onLikeClick } from "../../../../utils/api/onLikeClick";
import { CommunityContext } from "../../../../pages/community";
import useAuth from "../../../../hooks/useAuth";
import {
  IconBookmark,
  IconHeart,
  IconHeartFilled,
  IconMessage,
  IconShare,
} from "@tabler/icons-react";
import InvisibleButton from "../../../common/InvisibleButton/InvisibleButton";
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
  const [opening, handlers] = useDisclosure(false); // modal of PhotoViewer
  const router = useRouter();
  const { user, token } = useAuth();
  const [state, setState] = useSetState({ modalClickOutside: true });

  const imageSrcArray = extractImageSrc(post.content);
  const removeImgTag = removeImgTags(post.content);
  const canCloseModal = () => {
    useSetState((prevState: any) => ({
      modalClickOutside: !prevState.modalClickOutside,
    }));
  };
  const modalRef = useClickOutside(() => {
    if (state.modalClickOutside === false) {
      showError("수정 중에는 게시글을 떠날 수 없습니다.", null);
    }
  });

  // 모든 Category 이름 배열로 반환
  const data: string[] = [];
  for (let i = 0; i < CategoryNum; i++) {
    const values = Values[i];
    values.forEach((value) => {
      data.push(value.label);
    });
  }

  // boards/likedUsers에 현재 user-id가 들어있는 지 확인
  const isliking = user
    ? CheckIsliking({
        likedUsers: post.likedUsers,
        userId: user.id,
      })
    : false;

  const { mutatePost } = useContext(CommunityContext);

  return (
    <ModalContext.Provider
      value={{
        canCloseModal,
      }}
    >
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
              <MultiSelect
                className={classes.multiSelect}
                data={data}
                value={post.categoryTypes.map((item) => item.name)}
                readOnly
              />
              <Group spacing={13}>
                <Group spacing={8}>
                  <IconMessage size={20} stroke={1.3} />
                  <Text fz="sm">{post.child}</Text>
                </Group>
                <Group spacing={8}>
                  <InvisibleButton
                    onClick={(e) => {
                      e.stopPropagation();
                      onLikeClick({ boardId: post.id, token })
                        .then(() => {
                          mutatePost();
                        })
                        .catch((error) => {
                          // 오류 처리
                        });
                    }}
                  >
                    {isliking && <IconHeartFilled size={20} stroke={1.3} />}
                    {!isliking && <IconHeart size={20} stroke={1.3} />}
                  </InvisibleButton>
                  <Text fz="sm">{post.like}</Text>
                </Group>
                <InvisibleButton
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <IconShare size={20} stroke={1.3} />
                </InvisibleButton>
                <InvisibleButton
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <IconBookmark size={20} stroke={1.3} />
                </InvisibleButton>
              </Group>
            </Stack>
          </Stack>
        </CardContainer>
      </UnstyledButton>
    </ModalContext.Provider>
  );
}

export default PostViewer;
