import { Button, Group, MultiSelect, Stack, Text, useMantineTheme } from "@mantine/core";
import { IconBookmark, IconDotsVertical, IconHeart, IconHeartFilled, IconMessage, IconPencil, IconShare, IconTrash } from "@tabler/icons-react";
import { usePostFooterStyles } from "./PostFooter.styles";
import InvisibleButton from "../../../../../common/InvisibleButton/InvisibleButton";
import { CategoryNum, Values } from "../../../../../../constants/category";
import { Category } from "../../../../../../types/api/category";
import { useSetState } from "@mantine/hooks";

export interface PostFooterProps {
  onLikeClick?: () => void;
  onShareClick?: () => void;
  onBookmarkClick?: () => void;
  onEditClick?: () => void;
  categoryType: Category[];
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
  categoryType,
  commentCount,
  likeCount,
  isliking,
  isEditing,
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

  const [clickDot, setClickDot] = useSetState({ dot: false });

  return (
    <Stack spacing={0}>
      {!isEditing && 
        <MultiSelect
        className={classes.multiSelect}
        data={data}
        defaultValue={categoryType.map((item) => item.name)}
        readOnly
        />
      }
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
        <Group spacing={'xs'}>
          {(canEdit && !isEditing) && 
            <InvisibleButton className={classes.dotButton}
              onClick={() => {
                if (clickDot.dot) {
                  setClickDot({dot: false});
                }
                else {
                  setClickDot({dot: true});
                }  
              }}>
              <IconDotsVertical/>
            </InvisibleButton>
          }
          {(clickDot.dot && !isEditing) && 
            <>
              <Button className={classes.editButton} onClick={onEditClick}
              leftIcon={<IconPencil size={18} stroke={2}/>}
              > 글 수정 </Button>
              <Button className={classes.editButton}
              color="red"
              leftIcon={<IconTrash size={18} stroke={2}/>}
              > 글 삭제 </Button>
            </>
          }
        </Group>
      </Group>
    </Stack>
  );
}

export default PostFooter;
