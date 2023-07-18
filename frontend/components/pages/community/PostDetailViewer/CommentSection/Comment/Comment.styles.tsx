import { createStyles } from "@mantine/core";

export const useCommentStyles = createStyles((theme) => ({
  comment: {
    paddingBottom: 4,
  },

  deleteButton: {
    border: `1px solid ${theme.colors.red[6]}`,
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
    lineHeight: 1.5,
    marginBottom: "0px !important",
  },

  dotButton: {
    height: 22,
    borderRadius: 5,

    "&:hover": {
      backgroundColor: theme.colors.gray[1],
    },
  },

  menuItem: {
    padding: 5,
  },
}));
