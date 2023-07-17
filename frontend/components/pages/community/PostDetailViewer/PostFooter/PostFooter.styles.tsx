import { createStyles } from "@mantine/core";

export const usePostFooterStyles = createStyles((theme) => ({
  deleteAlert:{
    marginBottom: '1rem',
  },

  deleteButton:{
    border: `1px solid ${theme.colors.red[6]}`,
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

  menuItem: {
    padding: 5
  },
}));
