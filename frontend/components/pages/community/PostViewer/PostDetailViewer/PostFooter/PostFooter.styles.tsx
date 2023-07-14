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

  editButton: {
    height: 34,
    padding: "2px 5px 2px 8px",

    borderRadius: 5,
    backgroundColor: theme.colors.gray[1],
    // border: `1px solid ${theme.colors.gray[5]}`,
    "&:hover": {
      backgroundColor: theme.colors.gray[2],
    },
  },

  editText: {
    fontWeight: 'normal',
  },
}));
