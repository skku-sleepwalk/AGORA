import { Group, useMantineTheme } from "@mantine/core";
import { useGameReviewEditorStyles } from "./GameReviewEditor.styles";
import { useEditor } from "@tiptap/react";
import { RichTextEditor } from "@mantine/tiptap";
import { showNotification } from "../../../../../utils/notifications";
import { IconArrowBigRightLines, IconSend } from "@tabler/icons-react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import InvisibleButton from "../../../../common/InvisibleButton/InvisibleButton";
import { useMediaQuery } from "@mantine/hooks";

export interface GameReviewEditorProps {
  onEditClick?: () => void;
}

export function GameReviewEditor({ onEditClick }: GameReviewEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder: "도움이 되는 착한 후기를 남겨보세요." }),
    ],
    content: "",
  });
  const theme = useMantineTheme();

  const smallScreen = useMediaQuery("(max-width: 765px)");
  const { classes } = useGameReviewEditorStyles({ smallScreen });

  return (
    <Group className={classes.group}>
      <RichTextEditor editor={editor} className={classes.reviewEditor}>
        <RichTextEditor.Content />
      </RichTextEditor>
      <InvisibleButton
        onClick={() => {
          if (editor!.getHTML() === "<p></p>") {
            showNotification(null, "후기 내용을 입력해 주세요.");
          } else {
            onEditClick !== undefined ? onEditClick() : null;
          }
        }}
      >
        <IconSend
          className={classes.sendIcon}
          size={smallScreen ? "1.5rem" : "2rem"}
          stroke={1}
          color={theme.colors.gray[7]}
        />
      </InvisibleButton>
    </Group>
  );
}
