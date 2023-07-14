import { Group, MultiSelect, Stack, Text, useMantineTheme } from "@mantine/core";
import { IconBookmark, IconHeart, IconHeartFilled, IconMessage, IconPencil, IconShare } from "@tabler/icons-react";
import { usePostFooterStyles } from "./PostFooter.styles";
import InvisibleButton from "../../../../../common/InvisibleButton/InvisibleButton";
import { CategoryNum, Values } from "../../../../../../constants/category";
import { Category } from "../../../../../../types/api/category";
import { theme } from "../../../../../../styles/theme";

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
  canEdit: boolean;
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
  canEdit,
}: PostFooterProps) {
  const { classes } = usePostFooterStyles();
  const theme = useMantineTheme();
  
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
        {canEdit && 
        <InvisibleButton className={classes.editButton} onClick={onEditClick}>
          <Group spacing={2}>
            <Text color={theme.colors.gray[7]} className={classes.editText}>글 수정</Text>
            <IconPencil size={20} color={theme.colors.gray[7]} />
          </Group>
        </InvisibleButton>}
      </Group>
    </Stack>
  );
}

export default PostFooter;
