import { createStyles } from "@mantine/core";

export const useGameTabStyles = createStyles((theme) => ({
  tabList: {
    position: "relative",
    boxSizing: "border-box",
    width: "100%",
    height: "3rem",
    borderBottom: "none",
    paddingLeft: "2.3rem",

    backgroundColor: "#fcfcfe",
    boxShadow: `0px 6px 7px rgba(0, 0, 0, 0.2)`,
  },

  tabItem_B: {
    width: "8rem",
    fontSize: "1rem",

    "&:hover": {
      backgroundColor: "transparent",
      borderBottom: "none",
    },
  },

  tabItem_S: {
    width: "5rem",
    fontSize: "0.8rem",

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
