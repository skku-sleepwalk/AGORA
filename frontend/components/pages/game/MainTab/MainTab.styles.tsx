import { createStyles } from "@mantine/core";

export const useMainTabStyles = createStyles((theme) => ({
  tabList: {
    position: "relative",
    boxSizing: "border-box",
    width: "100%",
    height: "3rem",
    borderBottom: "0.2rem solid white",

    backgroundColor: "white",
    boxShadow: `0px 3px 10px rgba(0, 0, 0, 0.2)`,
  },

  tabItem: {
    width: "7rem",
    height: "3rem",
    fontSize: "1rem",

    "&:hover": {
      backgroundColor: "transparent",
      borderBottom: "0.2rem solid white",
    },
  },

  tabItemActive: {
    color: `${theme.colors.blue[6]} !important`,
    borderBottom: `0.2rem solid ${theme.colors.blue[6]}`,
    "&:hover": {
      borderBottom: `0.2rem solid ${theme.colors.blue[6]}`,
    },
  },

  button_B: {
    position: "absolute",
    top: "0.35rem",
    right: "4rem",
    borderColor: "black",

    "&:hover": {
      backgroundColor: "transparent",
    },
    ".mantine-Button-inner": {
      fontWeight: "normal",
      color: "black",
    },
  },

  button_S: {
    display: "none",
  },
}));
