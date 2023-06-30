import { createStyles } from "@mantine/core";

export const usePostFooterStyles = createStyles((theme) => ({
  footer: {
    padding: "10px 5px",
    borderBottom: `2px solid ${theme.colors.gray[9]}`,
  },

  commentButton: {
    width: 34,
    height: 34,
    borderRadius: 5,
    border: `2px solid ${theme.colors.gray[9]}`,
    "&:hover": {
      backgroundColor: theme.colors.gray[2],
    },
    "&:active": {
      backgroundColor: theme.colors.gray[3],
    },
  },
}));