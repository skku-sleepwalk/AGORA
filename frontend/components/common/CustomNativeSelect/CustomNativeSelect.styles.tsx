import { createStyles } from "@mantine/core";

export const useCustomNativeSelectStyles = createStyles((theme) => ({
  menuDropdown: {
    ".mantine-Menu-item": {
      paddingTop: "0.4rem",
      paddingBottom: "0.4rem",
      color: `${theme.colors.gray[6]}`,
    },
  },

  button: {
    padding: "0.3rem 0.7rem",

    border: `1px solid ${theme.colors.gray[4]}`,
    borderRadius: theme.radius.sm,
    backgroundColor: "transparent",
    fontWeight: "normal",
    fontSize: 14,
    color: `${theme.colors.gray[6]}`,
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
}));
