import { Center, Group, Text } from "@mantine/core";
import { IconBookmark, IconHeart, IconHeartFilled, IconMessage, IconPencil, IconShare } from "@tabler/icons-react";
import { usePostFooterStyles } from "./PostFooter.styles";
import InvisibleButton from "../../../../../common/InvisibleButton/InvisibleButton";

export interface PostFooterProps {
  onCommentClick?: () => void;
  onLikeClick?: () => void;
  onShareClick?: () => void;
  onBookmarkClick?: () => void;
  onEditClick?: () => void;
  commentCount: number;
  likeCount: number;
}

function PostFooter({
  onCommentClick,
  onLikeClick,
  onShareClick,
  onBookmarkClick,
  onEditClick,
  commentCount,
  likeCount,
}: PostFooterProps) {
  const { classes } = usePostFooterStyles();

  const isliking = false; // boards/likedUsers에 현재 user-id가 들어있는 지 확인

  return (
    <Group position="apart" className={classes.footer}>
      <Group spacing={13}>
        <Group spacing={8}>
          <InvisibleButton onClick={onCommentClick}>
            <IconMessage size={25} />
          </InvisibleButton>
          <Text>{commentCount}</Text>
        </Group>
        <Group spacing={8}>
          <InvisibleButton onClick={onLikeClick}>
            {isliking && <IconHeartFilled size={25}/>}
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
      <InvisibleButton className={classes.commentButton} onClick={onEditClick}>
        <IconPencil size={25} />
      </InvisibleButton>
    </Group>
  );
}

export default PostFooter;
