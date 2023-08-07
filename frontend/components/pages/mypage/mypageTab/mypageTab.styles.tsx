import { createStyles } from "@mantine/core";

export const useMypageTabStyles = createStyles((theme) => ({
  tabList: {
    position: "relative",
    boxSizing: "border-box",
    width: "100%",
    height: "3rem",
    borderBottom: "0.2rem solid #fcfcfe",
    paddingLeft: "2.3rem",

    backgroundColor: "white",
    boxShadow: `0px 6px 7px rgba(0, 0, 0, 0.2)`,
  },

  tabItem_B: {
    width: "8rem",
    height: "3rem",
    fontSize: "1rem",

    "&:hover": {
      backgroundColor: "transparent",
      borderBottom: "0.2rem solid #fcfcfe",
    },
  },

  tabItem_S: {
    width: "5rem",
    height: "3rem",
    fontSize: "0.8rem",

    "&:hover": {
      backgroundColor: "transparent",
      borderBottom: "0.2rem solid #fcfcfe",
    },
  },

  tabItemActive: {
    color: `${theme.colors.blue[6]} !important`,
    borderBottom: `0.2rem solid ${theme.colors.blue[6]}`,
    "&:hover": {
      borderBottom: `0.2rem solid ${theme.colors.blue[6]}`,
    },
  },
}));
