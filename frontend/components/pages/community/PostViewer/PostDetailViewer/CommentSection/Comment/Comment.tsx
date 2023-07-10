import { Collapse, Divider, Group, Stack, Text, useMantineTheme } from "@mantine/core";
import CommentFrame from "../CommentFrame/CommentFrame";
import InvisibleButton from "../../../../../../common/InvisibleButton/InvisibleButton";
import { IconChevronDown, IconChevronUp, IconHeart, IconMessage } from "@tabler/icons-react";
import { useCommentStyles } from "./Comment.styles";
import CommentEditor from "../CommentEditor/CommentEditor";
import { MOCKUP_USER } from "../../../../../../../mockups/user";
import { useDisclosure } from "@mantine/hooks";
import { Board } from "../../../../../../../types/api/boards";

export interface CommentProps {
  children?: React.ReactNode;
  post: Board;
  onSubmitComment?: (content: string, parentId: string) => void;
}

function Comment({ children, post, onSubmitComment }: CommentProps) {
  const theme = useMantineTheme();
  const { classes } = useCommentStyles();
  const [editorOpen, { toggle: toggleEditor }] = useDisclosure(false);
  const [commentOpen, { toggle: toggleComment }] = useDisclosure(false);

  return (
    <CommentFrame user={post.writer} withoutLeftBorder={!children || !commentOpen}>
      <Stack spacing={0}>
        <Stack spacing={10} className={classes.comment}>
          <Text size="sm">{post.content}</Text>
          <Group spacing={8}>
            <Group spacing={5}>
              <InvisibleButton>
                <IconHeart size={22} color={theme.colors.gray[6]} />
              </InvisibleButton>
              <Text color={theme.colors.gray[6]} size="xs">
                {post.like}
              </Text>
            </Group>
            <InvisibleButton onClick={toggleEditor}>
              <Group spacing={5}>
                <IconMessage size={22} color={theme.colors.gray[6]} />
                <Text color={theme.colors.gray[6]} size="xs">
                  답하기
                </Text>
              </Group>
            </InvisibleButton>
          </Group>
        </Stack>
        <Divider
          className={classes.divider}
          labelPosition="right"
          label={
            <InvisibleButton onClick={toggleComment}>
              <Group spacing={5} align="center">
                <Text color={theme.colors.gray[6]} size="sm">
                  {commentOpen ? "댓글 접기" : "댓글 보기"}
                </Text>
                {commentOpen ? (
                  <IconChevronUp size={16} color={theme.colors.gray[6]} />
                ) : (
                  <IconChevronDown size={16} color={theme.colors.gray[6]} />
                )}
              </Group>
            </InvisibleButton>
          }
        />
        <Collapse in={editorOpen}>
          <CommentEditor
            user={MOCKUP_USER}
            onSubmit={(content) => {
              onSubmitComment?.(content, post.id);
            }}
          />
        </Collapse>
      </Stack>
      <Collapse in={commentOpen}>
        {children || (
          <Text size="sm" color={theme.colors.gray[6]} align="center" className={classes.noComment}>
            등록된 댓글이 없습니다.
          </Text>
        )}
      </Collapse>
    </CommentFrame>
  );
}

export default Comment;
