import { Collapse, Group, Stack, Text, useMantineTheme } from "@mantine/core";
import { User } from "../../../../../../../types/user";
import CommentFrame from "../CommentFrame/CommentFrame";
import InvisibleButton from "../../../../../../common/InvisibleButton/InvisibleButton";
import { IconBookmark, IconHeart, IconMessage, IconPencil, IconShare } from "@tabler/icons-react";
import { useCommentStyles } from "./Comment.styles";
import CommentEditor from "../CommentEditor/CommentEditor";
import { MOCKUP_USER } from "../../../../../../../mockups/user";
import { useDisclosure } from "@mantine/hooks";

export interface CommentProps {
  children?: React.ReactNode;
  user: User;
}

function Comment({ children, user }: CommentProps) {
  const theme = useMantineTheme();
  const { classes } = useCommentStyles();
  const [editorOpen, { toggle: toggleEditor }] = useDisclosure(false);

  return (
    <CommentFrame user={user} withoutLeftBorder={!children}>
      <Stack spacing={0}>
        <Stack spacing={10} className={classes.comment}>
          <Text size="sm">
            인생을 낭비하는 것은 좋지 않습니다. 어서 가서 낮잠을 자시는게 좋겠어요.
          </Text>
          <Group spacing={8}>
            <Group spacing={5}>
              <InvisibleButton>
                <IconHeart size={22} color={theme.colors.gray[6]} />
              </InvisibleButton>
              <Text color={theme.colors.gray[6]} size="xs">
                7,111
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
        <Collapse in={editorOpen}>
          <CommentEditor user={MOCKUP_USER} />
        </Collapse>
      </Stack>
      {children}
    </CommentFrame>
  );
}

export default Comment;
