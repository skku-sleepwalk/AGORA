import { RichTextEditor, Link } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import RichTextEditorControlGroup from "../../../../common/RichTextEditorControlGroup/RichTextEditorControlGroup";
import { useRichEditorStyles } from "./RichEditor.styles";

function RichEditor() {
  const editor = useEditor({
    extensions: [StarterKit, Underline, Link, Superscript, SubScript, Highlight],
  });
  const { classes } = useRichEditorStyles();

  return (
    <RichTextEditor editor={editor} className={classes.editor}>
      <RichTextEditor.Toolbar>
        <RichTextEditorControlGroup />
      </RichTextEditor.Toolbar>
      <RichTextEditor.Content />
    </RichTextEditor>
  );
}
export default RichEditor;
