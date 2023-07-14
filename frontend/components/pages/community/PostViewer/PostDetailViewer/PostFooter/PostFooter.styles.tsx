import { createStyles } from "@mantine/core";

export const usePostFooterStyles = createStyles((theme) => ({
  multiSelect: {
    marginTop: 10,

    ".mantine-MultiSelect-input": {
      padding: 0,
      border: 'none',
    },
  },

  footer: {
    padding: "0px 5px 5px 5px",
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
