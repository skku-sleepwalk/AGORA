import { createStyles } from "@mantine/core";

export interface GameReviewEditorStylesProps {
  smallScreen: boolean;
}

export const useGameReviewEditorStyles = createStyles(
  (theme, { smallScreen }: GameReviewEditorStylesProps) => ({
    group: {
      display: "flex",
      flexWrap: "nowrap",

      alignItems: "flex-end",
    },

    textarea: {
      flexGrow: 1,

      ".mantine-Textarea-root, .mantine-Textarea-wrapper, .mantine-Textarea-input": {
        flexGrow: 1,
      },

      ".mantine-Textarea-wrapper": {
        borderRadius: theme.radius.sm,
        border: `1px solid ${theme.colors.gray[4]}`,
      },

      ".mantine-Textarea-input": {
        padding: smallScreen ? "0.4rem 0.5rem" : "0.75rem 0.65rem",
        border: "none",
        backgroundColor: "transparent",
        lineHeight: 1.2,
      },
    },

    sendIcon: {
      marginBottom: smallScreen ? "0.3rem" : "0.5rem",
    },
  })
);
