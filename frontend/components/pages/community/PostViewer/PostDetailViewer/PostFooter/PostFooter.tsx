import { Center, Group, Text } from "@mantine/core";
import { IconBookmark, IconHeart, IconMessage, IconPencil, IconShare } from "@tabler/icons-react";
import { usePostFooterStyles } from "./PostFooter.styles";
import InvisibleButton from "../../../../../common/InvisibleButton/InvisibleButton";

export interface PostFooterProps {
  onCommentClick?: () => void;
  onLikeClick?: () => void;
  onShareClick?: () => void;
  onBookmarkClick?: () => void;
  onEditClick?: () => void;
}

function PostFooter({
  onCommentClick,
  onLikeClick,
  onShareClick,
  onBookmarkClick,
  onEditClick,
}: PostFooterProps) {
  const { classes } = usePostFooterStyles();

  return (
    <Group position="apart" className={classes.footer}>
      <Group spacing={13}>
        <Group spacing={8}>
          <InvisibleButton onClick={onCommentClick}>
            <IconMessage size={25} />
          </InvisibleButton>
          <Text>12,119</Text>
        </Group>
        <Group spacing={8}>
          <InvisibleButton onClick={onLikeClick}>
            <IconHeart size={25} />
          </InvisibleButton>
          <Text>7,111</Text>
        </Group>
        <InvisibleButton onClick={onShareClick}>
          <IconShare size={25} />
        </InvisibleButton>
        <InvisibleButton onClick={onBookmarkClick}>
          <IconBookmark size={25} />
        </InvisibleButton>
      </Group>
      <InvisibleButton className={classes.commentButton} onClick={onEditClick}>
        <IconPencil size={25} />
      </InvisibleButton>
    </Group>
  );
}

export default PostFooter;
