import { createStyles } from "@mantine/core";

export const useGameBoardWriterStyles = createStyles((theme) => ({
  editorContainer: {
    width: 800,
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
}));
