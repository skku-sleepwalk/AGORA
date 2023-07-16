import { Alert, Button, Group, Menu, Stack, Text, UnstyledButton } from "@mantine/core";
import {
  IconAlertCircle,
  IconBell,
  IconBookmark,
  IconDotsVertical,
  IconHeart,
  IconHeartFilled,
  IconMessage,
  IconPencil,
  IconShare,
  IconTrash,
} from "@tabler/icons-react";
import { usePostFooterStyles } from "./PostFooter.styles";
import InvisibleButton from "../../../../../common/InvisibleButton/InvisibleButton";
import { useSetState } from "@mantine/hooks";
import deletePost from "../../../../../../utils/api/deletepost";
export interface PostFooterProps {
  onLikeClick?: () => void;
  onShareClick?: () => void;
  onBookmarkClick?: () => void;
  onEditClick?: () => void;
  commentCount: number;
  likeCount: number;
  isliking: boolean;
  isEditing: boolean;
  canEdit: boolean;
  postId: string;
  closeFunction: Function;
}

function PostFooter({
  onLikeClick,
  onShareClick,
  onBookmarkClick,
  onEditClick,
  commentCount,
  likeCount,
  isliking,
  isEditing,
  canEdit,
  postId,
  closeFunction,
}: PostFooterProps) {
  const { classes } = usePostFooterStyles();

  const [isDeleting, setIsDeleting] = useSetState({ delete: false });

  return (
    <Stack spacing={0}>
      {isDeleting.delete && (
        <Alert
          className={classes.deleteAlert}
          icon={<IconAlertCircle size="1rem" />}
          title="게시글을 삭제하시겠습니까?"
          color="red"
          withCloseButton
          onClose={() => {
            setIsDeleting({ delete: false });
          }}
        >
          <Stack spacing={"xs"}>
            게시글을 삭제하면 되돌릴 수 없습니다.
            <Group position="right">
              <Button
                variant="light"
                color="red"
                className={classes.deleteButton}
                onClick={() => {
                  setIsDeleting({ delete: false });
                  // 게시글 삭제시 함수
                  deletePost(postId).then(() => closeFunction);
                }}
              >
                {" "}
                삭제{" "}
              </Button>
            </Group>
          </Stack>
        </Alert>
      )}
      <Group position="apart" className={classes.footer}>
        <Group spacing={13}>
          <Group spacing={8}>
            <IconMessage size={25} />
            <Text>{commentCount}</Text>
          </Group>
          <Group spacing={8}>
            <InvisibleButton onClick={onLikeClick}>
              {isliking && <IconHeartFilled size={25} color="#fd0061" />}
              {!isliking && <IconHeart size={25} />}
            </InvisibleButton>
            <Text>{likeCount}</Text>
          </Group>
          <InvisibleButton onClick={onShareClick}>
            <IconShare size={25} />
          </InvisibleButton>
          <InvisibleButton onClick={onBookmarkClick}>
            <IconBookmark size={25} />
          </InvisibleButton>
        </Group>
        {!isEditing && !isDeleting.delete && (
          <Group>
            <Menu shadow="md" width={120} position="bottom-end" offset={1}>
              <Menu.Target>
                <UnstyledButton className={classes.dotButton}>
                  <IconDotsVertical />
                </UnstyledButton>
              </Menu.Target>
              <Menu.Dropdown>
                {!canEdit && (
                  <Menu.Item icon={<IconBell size={18} stroke={2} />} className={classes.menuItem}>
                    {" "}
                    신고하기{" "}
                  </Menu.Item>
                )}
                {canEdit && (
                  <>
                    <Menu.Item
                      onClick={onEditClick}
                      icon={<IconPencil size={18} stroke={2} />}
                      className={classes.menuItem}
                    >
                      {" "}
                      수정하기{" "}
                    </Menu.Item>
                    <Menu.Divider />
                    <Menu.Item
                      onClick={() => {
                        setIsDeleting({ delete: true });
                      }}
                      icon={<IconTrash size={18} stroke={2} />}
                      className={classes.menuItem}
                    >
                      {" "}
                      삭제하기{" "}
                    </Menu.Item>
                  </>
                )}
              </Menu.Dropdown>
            </Menu>
          </Group>
        )}
      </Group>
    </Stack>
  );
}

export default PostFooter;
