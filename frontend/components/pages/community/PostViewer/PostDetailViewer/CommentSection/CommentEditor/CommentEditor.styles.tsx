import { createStyles } from "@mantine/core";

export const useCommentEditorStyles = createStyles((theme) => ({
  editorWrapper: {
    paddingBottom: 12,
    marginBottom: 8,
    borderBottom: `2px solid ${theme.colors.gray[3]}`,
  },

  commentEditor: {
    ".mantine-RichTextEditor-content": {
      fontSize: theme.fontSizes.sm,
    },
    ".mantine-RichTextEditor-toolbar": {
      borderBottom: "none",
      borderTop: `1px solid ${theme.colors.gray[4]}`,
    },
  },

  submitButton: {
    height: 25,
    fontSize: theme.fontSizes.xs,
    backgroundColor: theme.colors.teal[5],
    "&:hover": {
      backgroundColor: theme.colors.teal[6],
    },
  },

  toolbarGroup: {
    width: "100%",
  },
}));
