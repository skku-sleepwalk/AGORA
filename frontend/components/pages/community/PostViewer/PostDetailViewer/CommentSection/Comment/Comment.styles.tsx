import { createStyles } from "@mantine/core";

export const useCommentStyles = createStyles((theme) => ({
  comment: {
    paddingBottom: 12,
    marginBottom: 8,
    borderBottom: `2px solid ${theme.colors.gray[3]}`,
  },
}));
