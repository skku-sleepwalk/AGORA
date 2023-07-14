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
import { forwardRef, useImperativeHandle } from "react";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { lowlight } from "lowlight";

interface ChildProps {
  content: string;
}

const RichEditor = forwardRef(({ content }: ChildProps, ref) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      CodeBlockLowlight.configure({
        lowlight,
      }),
      Image,
    ],
    content: content,
  });
  const { classes } = useRichEditorStyles();

  useImperativeHandle(ref, () => ({
    getHTML: () => {
      return editor?.getHTML();
    },
  }));

  return (
    <RichTextEditor editor={editor} className={classes.editor}>
      <RichTextEditor.Toolbar sticky>
        <RichTextEditorControlGroup editor={editor} />
      </RichTextEditor.Toolbar>
      <RichTextEditor.Content />
    </RichTextEditor>
  );
});
export default RichEditor;
