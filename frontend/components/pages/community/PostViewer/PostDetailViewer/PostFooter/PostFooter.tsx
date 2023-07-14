import { Group, MultiSelect, Stack, Text } from "@mantine/core";
import { IconBookmark, IconHeart, IconHeartFilled, IconMessage, IconPencil, IconShare } from "@tabler/icons-react";
import { usePostFooterStyles } from "./PostFooter.styles";
import InvisibleButton from "../../../../../common/InvisibleButton/InvisibleButton";
import { CategoryNum, Values } from "../../../../../../constants/category";
import { Category } from "../../../../../../types/api/category";

export interface PostFooterProps {
  onCommentClick?: () => void;
  onLikeClick?: () => void;
  onShareClick?: () => void;
  onBookmarkClick?: () => void;
  onEditClick?: () => void;
  categoryType: Category[];
  commentCount: number;
  likeCount: number;
  isliking: boolean;
}

function PostFooter({
  onLikeClick,
  onShareClick,
  onBookmarkClick,
  onEditClick,
  categoryType,
  commentCount,
  likeCount,
  isliking,
}: PostFooterProps) {
  const { classes } = usePostFooterStyles();
  let data = new Array();
  for (let i = 0; i < CategoryNum; i++) {
    const values = Values[i];
    values.map((value) => {
      data.push(value.label);
    });
  }

  return (
    <Stack spacing={0}>
      <MultiSelect
      className={classes.multiSelect}
      data={data}
      defaultValue={categoryType.map((item) => item.name)}
      readOnly
      />
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
        <InvisibleButton className={classes.commentButton} onClick={onEditClick}>
          <IconPencil size={25} />
        </InvisibleButton>
      </Group>
    </Stack>
  );
}

export default PostFooter;
