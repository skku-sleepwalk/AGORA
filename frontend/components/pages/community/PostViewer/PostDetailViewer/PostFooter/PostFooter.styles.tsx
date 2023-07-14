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

  dotButton: {
    height: 25,
    borderRadius: 5,

    "&:hover": {
      backgroundColor: theme.colors.gray[1],
    }
  },

  editButton: {
    height: 25,
    padding: "2px 8px",

    borderRadius: 5,

    ".mantine-Button-leftIcon": {
      marginRight: 5,
    },
    ".mantine-Button-label": {
      fontWeight: "normal",
    },
  },

  editText: {
    fontWeight: 'normal',
  },
}));
