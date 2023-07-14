import { Group, Menu, Stack, Text, UnstyledButton, useMantineTheme } from "@mantine/core";
import { IconBell, IconBookmark, IconDotsVertical, IconHeart, IconHeartFilled, IconMessage, IconPencil, IconShare, IconTrash } from "@tabler/icons-react";
import { usePostFooterStyles } from "./PostFooter.styles";
import InvisibleButton from "../../../../../common/InvisibleButton/InvisibleButton";
import { CategoryNum, Values } from "../../../../../../constants/category";

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
}: PostFooterProps) {
  const { classes } = usePostFooterStyles();
  const theme = useMantineTheme();

  return (
    <Stack spacing={0}>
      <Group position="apart" className={classes.footer}>
        <Group spacing={13}>
          <Group spacing={8}>
            <IconMessage size={25} />
            <Text>{commentCount}</Text>
          </Group>
          <Group spacing={8}>
            <InvisibleButton onClick={onLikeClick}>
              {isliking && <IconHeartFilled size={25} color="#fd0061"/>}
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
        {!isEditing &&
          <Group>
            <Menu shadow="md" width={120} 
              position="bottom-end" offset={1}>
              <Menu.Target>
                <UnstyledButton className={classes.dotButton}>
                  <IconDotsVertical/>
                </UnstyledButton>
              </Menu.Target>
              <Menu.Dropdown>
                {!canEdit &&
                <Menu.Item
                  icon={<IconBell size={18} stroke={2}/>}
                  className={classes.menuItem}
                > 신고하기 </Menu.Item>
                }
                {canEdit &&
                  <>
                    <Menu.Item 
                      onClick={onEditClick}
                      icon={<IconPencil size={18} stroke={2}/>}
                      className={classes.menuItem}
                    > 수정하기 </Menu.Item>
                    <Menu.Divider />
                    <Menu.Item
                      icon={<IconTrash size={18} stroke={2}/>}
                      className={classes.menuItem}
                    > 삭제하기 </Menu.Item>
                  </>
                }
              </Menu.Dropdown>
            </Menu>
          </Group>
        }
      </Group>
    </Stack>
  );
}

export default PostFooter;
