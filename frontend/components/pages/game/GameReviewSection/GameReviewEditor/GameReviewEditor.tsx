import { Alert, Box, Button, Group, Stack } from "@mantine/core";
import { useGameReviewEditorStyles } from "./GameReviewEditor.styles";
import { useEditor } from "@tiptap/react";
import { useSetState } from "@mantine/hooks";
import { RichTextEditor } from "@mantine/tiptap";
import RichTextEditorControlGroup from "../../../../common/RichTextEditorControlGroup/RichTextEditorControlGroup";
import { showNotification } from "../../../../../utils/notifications";
import { IconAlertCircle } from "@tabler/icons-react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import Superscript from "@tiptap/extension-superscript";
import Subscript from "@tiptap/extension-subscript";
import Highlight from "@tiptap/extension-highlight";
import Placeholder from "@tiptap/extension-placeholder";

export interface GameReviewEditorProps {
  onCancelClick?: () => void;
  onEditClick?: () => void;
}

export function GameReviewEditor({ onCancelClick, onEditClick }: GameReviewEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      Subscript,
      Highlight,
      Placeholder.configure({ placeholder: "모두에게 도움이 되는 착한 후기를 남겨보세요." }),
    ],
    content: "",
  });
  const { classes } = useGameReviewEditorStyles();

  const [isCanceling, setIsCanceling] = useSetState({ cancel: false });

  return (
    <Box>
      <RichTextEditor editor={editor} className={classes.commentEditor}>
        <RichTextEditor.Content />

        <RichTextEditor.Toolbar>
          <Group position="apart" className={classes.toolbarGroup}>
            <Group>
              <RichTextEditorControlGroup editor={editor} gameReview={true} />
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
                    if (editor!.getHTML() === "<p></p>") {
                      showNotification(null, "후기 내용을 입력해 주세요.");
                    } else {
                      onEditClick !== undefined ? onEditClick() : null;
                    }
                  }}
                >
                  작성
                </Button>
              </Group>
            )}
          </Group>
        </RichTextEditor.Toolbar>
        {isCanceling.cancel && (
          <Alert
            className={classes.cancelAlert}
            icon={<IconAlertCircle size="1rem" />}
            title="작성을 취소하시겠습니까?"
            color="red"
            withCloseButton
            onClose={() => {
              setIsCanceling({ cancel: false });
            }}
          >
            <Stack spacing={"xs"}>
              작성을 취소하면 현재 작성된 내용을 모두 잃습니다.
              <Group position="right">
                <Button
                  variant="light"
                  color="gray"
                  className={classes.cancelButton}
                  onClick={() => {
                    setIsCanceling({ cancel: false });
                    onCancelClick !== undefined ? onCancelClick() : null;
                  }}
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
