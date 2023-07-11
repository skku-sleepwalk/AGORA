import { createStyles } from "@mantine/core";

export const useCommentStyles = createStyles((theme) => ({
  comment: {
    paddingBottom: 4,
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
}));
