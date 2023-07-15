import { createStyles } from "@mantine/core";

export const useCommentStyles = createStyles((theme) => ({
  comment: {
    paddingBottom: 4,
  },

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

  divider: {
    marginBottom: 4,
  },

  noComment: {
    margin: "10px 0",
  },

  moreButton: {
    height: 30,
    textDecoration: "underline",
  },

  content: {
    lineHeight: 0.5,
  },

  dotButton: {
    height: 22,
    borderRadius: 5,

    "&:hover": {
      backgroundColor: theme.colors.gray[1],
    }
  },

  menuItem: {
    padding: 5
  },
}));
