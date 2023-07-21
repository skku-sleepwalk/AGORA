import { createStyles } from "@mantine/core";

export const useMainTabStyles = createStyles((theme) => ({
  container: {
    width: "100%",
    height: "3rem",
    position: "fixed",
    padding: 0,
    backgroundColor: "white",
  },
  tabList: {
    boxSizing: "border-box",
    width: "100%",
    height: "3rem",
    borderBottom: "none",
    alignSelf: "flex-end",
    boxShadow: `0px 3px 10px rgba(0, 0, 0, 0.2)`,
  },
  tabItem: {
    boxSizing: "border-box",
    height: "3rem",
    width: "7rem",
    fontSize: "1rem",
    "&:hover": {
      backgroundColor: "transparent",
      borderBottom: "none",
    },
  },
  tabItemActive: {
    color: `${theme.colors.blue[6]} !important`,
    borderBottom: `0.15rem solid ${theme.colors.blue[6]}`,
    "&:hover": {
      borderBottom: `0.15rem solid ${theme.colors.blue[6]}`,
    },
  },
}));
