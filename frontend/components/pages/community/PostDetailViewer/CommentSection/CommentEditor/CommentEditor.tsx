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
import Placeholder from "@tiptap/extension-placeholder";
import { lowlight } from "lowlight";
import { Alert, Box, Button, Group, Stack } from "@mantine/core";
import Image from "@tiptap/extension-image";
import CommentFrame from "../CommentFrame/CommentFrame";
import RichTextEditorControlGroup from "../../../../../common/RichTextEditorControlGroup/RichTextEditorControlGroup";
import { User } from "../../../../../../types/api/user";
import { patchComment } from "../../../../../../utils/api/patchComment";
import { showNotification } from "../../../../../../utils/notifications";
import { IconAlertCircle } from "@tabler/icons-react";
import useAuth from "../../../../../../hooks/useAuth";
import { useSetState } from "@mantine/hooks";
import { useContext } from "react";
import { PostContext } from "../../PostDetailViewer";

export interface CommentEditorProps {
  user: User;
  placeholder: string;
  onSubmit?: (content: string) => Promise<any>;
}

function CommentEditor({ user, placeholder, onSubmit }: CommentEditorProps) {
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
      Placeholder.configure({ placeholder: placeholder }),
      Image,
    ],
  });

  return (
    <CommentFrame user={user} date={null} withoutLeftBorder>
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

  const { mutatePostDetail } = useContext(PostContext);

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
                    if (editor!.getHTML() === "<p></p>") {
                      showNotification("댓글 없음", "댓글 내용을 입력해 주세요.");
                    } else {
                      patchComment({
                        boardId: commentId,
                        data: {
                          title: undefined,
                          content: editor!.getHTML(),
                          categoryNames,
                        },
                        token,
                      }).then(() => {
                        showNotification("업로드 완료", "게시물이 성공적으로 수정되었습니다.");
                        onEditClick !== undefined ? onEditClick() : null;
                        mutatePostDetail();
                      });
                    }
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
