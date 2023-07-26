import { createStyles } from "@mantine/core";

export interface GameReviewEditorProps {
  smallScreen: boolean;
}

export const useGameReviewEditorStyles = createStyles(
  (theme, { smallScreen }: GameReviewEditorProps) => ({
    group: {
      display: "flex",
      flexWrap: "nowrap",

      alignItems: "flex-end",
    },

    reviewEditor: {
      display: "flex",
      flexGrow: 1,
      width: "100%",

      ".mantine-RichTextEditor-typographyStylesProvider, .mantine-RichTextEditor-content": {
        flexGrow: 1,
      },
      ".mantine-RichTextEditor-content": {
        backgroundColor: "transparent",
        fontSize: smallScreen ? theme.fontSizes.xs : theme.fontSizes.sm,
        ".ProseMirror": {
          padding: smallScreen ? "0.6rem" : "1rem",
        },
      },
    },

    sendIcon: {
      marginBottom: smallScreen ? "0.3rem" : "0.5rem",
    },
  })
);
