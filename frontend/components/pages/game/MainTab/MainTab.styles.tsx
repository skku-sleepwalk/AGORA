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
    width: "100%",
    borderBottom: "0.1rem solid black",
    alignSelf: "flex-end",
  },
  tabItem: {
    boxSizing: "border-box",
    height: "2.5rem",
    width: "7rem",
    fontSize: "1rem",
    "&:hover": {
      backgroundColor: "transparent",
      borderBottom: "0.1rem solid black",
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
