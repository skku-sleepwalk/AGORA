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
import CommentFrame from "../CommentFrame/CommentFrame";
import RichTextEditorControlGroup from "../../../../../../common/RichTextEditorControlGroup/RichTextEditorControlGroup";
import { User } from "../../../../../../../types/api/user";

export interface CommentEditorProps {
  user: User;
  onSubmit?: (content: string) => Promise<any>;
}

function CommentEditor({ user, onSubmit }: CommentEditorProps) {
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
              <Group>
                <RichTextEditorControlGroup editor={editor} />
              </Group>
              <Button
                radius="xl"
                className={classes.submitButton}
                onClick={() => {
                  onSubmit?.(editor!.getHTML()).then(() => {
                    editor!.commands.setContent("");
                  });
                }}
              >
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
