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
import { forwardRef, useImperativeHandle } from "react";
import { useRichEditorStyles } from "../../../../PostWriter/RichEditor/RichEditor.styles";
import { ButtonProgress } from "../../../../PostWriter/ButtonProgress/ButtonProgress";
import { patchPost } from "../../../../../../../utils/api/patchPost";
import useAuth from "../../../../../../../hooks/useAuth";
import { showNotification } from "../../../../../../../utils/notifications";
import { patchComment } from "../../../../../../../utils/api/patchComment";

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

export interface CommentEditorPartProps {
  onCancelClick?: () => void;
  onEditClick?: () => void;
  commentId: string;
  content: string;
}

export const CommentEditorPart = forwardRef(({ onCancelClick, onEditClick, commentId, content }: CommentEditorPartProps, ref) => {
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
    content: content,
  });
  const { classes } = useCommentEditorStyles();
  const { token, user } = useAuth();

  return (
    <form
      onSubmit={() => {
        alert(editor!.getHTML());
        // patchPost({
        //   boardId: commentId,
        //   data:{
        //     content: editor!.getHTML(),
        //   },
        //   token
        // }
        // ).then(() => {
        //   showNotification("업로드 완료", "게시물이 성공적으로 수정되었습니다.");
        //   // onEditClick;
        // });
      }}
    >
      <Box>
        <RichTextEditor editor={editor} className={classes.commentEditor}>
          <RichTextEditor.Content />

          <RichTextEditor.Toolbar>
            <Group position="apart" className={classes.toolbarGroup}>
              <Group>
                <RichTextEditorControlGroup editor={editor} />
              </Group>
              <Group spacing={'xs'}>
                <Button
                  className={classes.EditButton}
                  variant="light" color="gray"
                  onClick={onCancelClick}
                > 취소 </Button>
                <ButtonProgress text="수정" type="submit" 
                  className={classes.EditButton}
                />
              </Group>
            </Group>
          </RichTextEditor.Toolbar>
        </RichTextEditor>
      </Box>
    </form>
  );
});
