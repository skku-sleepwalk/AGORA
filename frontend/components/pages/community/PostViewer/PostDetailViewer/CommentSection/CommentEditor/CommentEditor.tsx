import { useEditor } from "@tiptap/react";
import { useCommentEditorStyles } from "./CommentEditor.styles";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import Superscript from "@tiptap/extension-superscript";
import Subscript from "@tiptap/extension-subscript";
import Highlight from "@tiptap/extension-highlight";
import { RichTextEditor } from "@mantine/tiptap";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { lowlight } from "lowlight";
import { Box, Button, Group } from "@mantine/core";
import Image from "@tiptap/extension-image";
import { User } from "../../../../../../../types/user";
import CommentFrame from "../CommentFrame/CommentFrame";
import RichTextEditorControlGroup from "../../../../../../common/RichTextEditorControlGroup/RichTextEditorControlGroup";
import { useDebouncedState } from "@mantine/hooks";
import { forwardRef, useEffect, useImperativeHandle } from "react";

export interface CommentEditorProps {
  user: User;
}

const CommentEditor = forwardRef(({ user }: CommentEditorProps, ref) => {
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

  useImperativeHandle(ref, () => ({
    getHTML: () => {
      return editor?.getHTML();
    },
  }));

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
});

export default CommentEditor;
