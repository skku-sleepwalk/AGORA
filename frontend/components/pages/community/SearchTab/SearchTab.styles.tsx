import { createStyles } from "@mantine/core";

export const useSearchTabStyles = createStyles((theme) => ({
  tabItem: {
    color: theme.colors.gray[6],
    fontSize: 20,
    width: 115,
  },

  tabItemActive: {
    color: `${theme.colors.blue[6]} !important`,
  },

  tabList: {
    width: "100%",
  },

  settingButton: {
    color: theme.colors.gray[6],
    backgroundColor: "white",
    fontSize: 20,
    fontWeight: 500,
    "&:hover": {
      backgroundColor: theme.colors.gray[1],
    },
  },

  dropdown: {
    padding: "20px 17px",
  },

  settingItem: {
    ".mantine-NativeSelect-label": {
      marginBottom: 10,
    },
    ".mantine-NativeSelect-input": {
      color: theme.colors.gray[6],
      width: 100,
    },
  },
}));
