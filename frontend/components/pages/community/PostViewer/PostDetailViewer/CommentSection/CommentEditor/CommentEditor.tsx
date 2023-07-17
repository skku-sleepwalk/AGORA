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
import { Alert, Box, Button, Group, Stack } from "@mantine/core";
import Image from "@tiptap/extension-image";
import CommentFrame from "../CommentFrame/CommentFrame";
import RichTextEditorControlGroup from "../../../../../../common/RichTextEditorControlGroup/RichTextEditorControlGroup";
import { User } from "../../../../../../../types/api/user";
import useAuth from "../../../../../../../hooks/useAuth";
import { showNotification } from "../../../../../../../utils/notifications";
import { patchComment } from "../../../../../../../utils/api/patchComment";
import { IconAlertCircle } from "@tabler/icons-react";
import { useSetState } from "@mantine/hooks";

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
                className={classes.EditButton}
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
  categoryNames: string[];
}

export function CommentEditorPart({
  onCancelClick,
  onEditClick,
  commentId,
  content,
  categoryNames,
}: CommentEditorPartProps) {
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

  const [isCanceling, setIsCanceling] = useSetState({ cancel: false });

  return (
    <Box>
      <RichTextEditor editor={editor} className={classes.commentEditor}>
        <RichTextEditor.Content />

        <RichTextEditor.Toolbar>
          <Group position="apart" className={classes.toolbarGroup}>
            <Group>
              <RichTextEditorControlGroup editor={editor} />
            </Group>
            {!isCanceling.cancel && (
              <Group spacing={"xs"}>
                <Button
                  className={classes.EditButton}
                  variant="light"
                  color="gray"
                  onClick={() => {
                    setIsCanceling({ cancel: true });
                  }}
                >
                  취소
                </Button>
                <Button
                  className={classes.EditButton}
                  onClick={() => {
                    // alert(editor!.getHTML());
                    patchComment({
                      boardId: commentId,
                      data: {
                        title: null,
                        content: editor!.getHTML(),
                        categoryNames,
                      },
                      token,
                    }).then(() => {
                      showNotification("업로드 완료", "게시물이 성공적으로 수정되었습니다.");
                      onEditClick !== undefined ? onEditClick() : null;
                    });
                  }}
                >
                  수정
                </Button>
              </Group>
            )}
          </Group>
        </RichTextEditor.Toolbar>
        {isCanceling.cancel && (
          <Alert
            className={classes.cancelAlert}
            icon={<IconAlertCircle size="1rem" />}
            title="수정을 취소하시겠습니까?"
            color="red"
            withCloseButton
            onClose={() => {
              setIsCanceling({ cancel: false });
            }}
          >
            <Stack spacing={"xs"}>
              수정을 취소하면 현재 수정된 내용을 모두 잃습니다.
              <Group position="right">
                <Button
                  variant="light"
                  color="gray"
                  className={classes.cancelButton}
                  onClick={onCancelClick}
                >
                  취소
                </Button>
              </Group>
            </Stack>
          </Alert>
        )}
      </RichTextEditor>
    </Box>
  );
}
