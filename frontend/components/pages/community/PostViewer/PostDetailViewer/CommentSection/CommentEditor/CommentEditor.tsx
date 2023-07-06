import { useEditor } from "@tiptap/react";
import { useCommentEditorStyles } from "./CommentEditor.styles";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import Superscript from "@tiptap/extension-superscript";
import Subscript from "@tiptap/extension-subscript";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import { RichTextEditor } from "@mantine/tiptap";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { lowlight } from "lowlight";
import { IconCodeDots, IconPhoto } from "@tabler/icons-react";
import { ActionIcon, Box, Button, Group, useMantineTheme } from "@mantine/core";
import Image from "@tiptap/extension-image";
import { User } from "../../../../../../../types/user";
import CommentFrame from "../CommentFrame/CommentFrame";
import RichTextEditorControlGroup from "../../../../../../common/RichTextEditorControlGroup/RichTextEditorControlGroup";

export interface CommentEditorProps {
  user: User;
}

function CommentEditor({ user }: CommentEditorProps) {
  const { classes } = useCommentEditorStyles();
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      Subscript,
      Highlight,
      CodeBlockLowlight.configure({
        lowlight,
      }),
      Image,
    ],
  });

  return (
    <CommentFrame user={user} withoutLeftBorder>
      <Box className={classes.editorWrapper}>
        <RichTextEditor editor={editor} className={classes.commentEditor}>
          <RichTextEditor.Content />

          <RichTextEditor.Toolbar>
            <Group position="apart" className={classes.toolbarGroup}>
              <RichTextEditorControlGroup editor={editor} />
              <Button radius="xl" className={classes.submitButton}>
                작성
              </Button>
            </Group>
          </RichTextEditor.Toolbar>
        </RichTextEditor>
      </Box>
    </CommentFrame>
  );
}

export default CommentEditor;
