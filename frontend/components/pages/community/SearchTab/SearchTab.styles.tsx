import { createStyles } from "@mantine/core";

export const useSearchTabStyles = createStyles((theme) => ({
  tabItem: {
    color: theme.colors.gray[5],
    fontSize: 16,
    width: "7.2rem",
  },

  tabItemActive: {
    color: `${theme.colors.blue[6]} !important`,
  },

  tabList: {
    width: "100%",
    alignItems: "flex-end",
  },

  settingButton: {
    color: theme.colors.gray[5],
    backgroundColor: "transparent",
    boxSizing: "border-box",
    height: "2.875rem",

    fontSize: 16,
    fontWeight: 500,
    "&:hover": {
      backgroundColor: theme.colors.gray[0],
    },
  },

  settingItem: {
    ".mantine-NativeSelect-label": {
      marginBottom: "0.75rem",
      marginLeft: "0.25rem",
      color: theme.colors.gray[5],
    },
    ".mantine-NativeSelect-wrapper": {
      marginBottom: "0.25rem",
      backgroundColor: "#F3F3F3",
      border: "none",
      borderRadius: 15,
    },
    ".mantine-NativeSelect-input": {
      backgroundColor: "transparent",
      border: "none",
      width: "6.875rem",
    },
  },

  nativeSelect: {
    marginBottom: "0.3rem",
  },

  marginTop: {
    marginTop: "0.25rem",
  },
}));
