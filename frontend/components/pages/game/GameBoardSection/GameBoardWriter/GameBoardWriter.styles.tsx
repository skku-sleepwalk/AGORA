import { createStyles } from "@mantine/core";

export interface GameBoardWriterStylesProps {
  fullWidth?: boolean;
}

export const useGameBoardWriterStyles = createStyles(
  (theme, { fullWidth }: GameBoardWriterStylesProps) => ({
    editorContainer: {
      width: fullWidth ? "100%" : "800px",
      padding: "0.5rem",
      paddingBottom: "0.2rem",
    },

    title: {
      flexGrow: 1,

      ".mantine-TextInput-wrapper": {
        borderRadius: theme.radius.sm,
        border: `1px solid ${theme.colors.gray[4]}`,
      },

      ".mantine-TextInput-input": {
        border: "none",
        backgroundColor: "transparent",
      },
    },
  })
);
