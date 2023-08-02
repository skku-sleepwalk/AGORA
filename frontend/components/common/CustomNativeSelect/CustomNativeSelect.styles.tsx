import { createStyles } from "@mantine/core";

export interface CustomNativeSelectStylesProps {
  height?: string;
}

export const useCustomNativeSelectStyles = createStyles(
  (theme, { height }: CustomNativeSelectStylesProps) => ({
    menuDropdown: {
      ".mantine-Menu-item": {
        paddingTop: "0.4rem",
        paddingBottom: "0.4rem",
        color: `${theme.colors.gray[6]}`,
      },
    },

    button: {
      boxSizing: "border-box",
      height: height,
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
  })
);
