import { RichTextEditor, Link } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import RichTextEditorControlGroup from "../../../../common/RichTextEditorControlGroup/RichTextEditorControlGroup";
import { useRichEditorStyles } from "./RichEditor.styles";
import Image from "@tiptap/extension-image";

export interface RichEditorProps {
  onChange?: (content: string) => void;
  value?: string;
}

function RichEditor({ onChange, value }: RichEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit, Underline, Link, Superscript, SubScript, Highlight, Image],
    content: "",
  });
  const { classes } = useRichEditorStyles();

  editor?.on("update", () => {
    onChange?.(editor.getHTML());
  });

  return (
    <RichTextEditor editor={editor} className={classes.editor}>
      <RichTextEditor.Toolbar>
        <RichTextEditorControlGroup editor={editor} />
      </RichTextEditor.Toolbar>
      <RichTextEditor.Content />
    </RichTextEditor>
  );
}
export default RichEditor;
