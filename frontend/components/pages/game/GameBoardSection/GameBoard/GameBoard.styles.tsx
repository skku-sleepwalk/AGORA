import { createStyles } from "@mantine/core";

export interface GameBoardStylesProps {
  smallScreen: boolean;
}

export const useGameBoardStyles = createStyles((theme, { smallScreen }: GameBoardStylesProps) => ({
  stack: {
    margin: "1rem 1.5rem",
    marginBottom: "0.1rem",
  },

  group: {
    marginLeft: smallScreen ? "0.7rem" : "1rem",
    flexWrap: "nowrap",
  },

  boardStack: {
    flexGrow: 1,
    padding: "0.7rem 0rem 0.3rem",
  },

  noImage: {
    display: "flex",

    minWidth: smallScreen ? "6rem" : "8rem",
    minHeight: smallScreen ? "6rem" : "8rem",
    borderRadius: theme.radius.lg,
    backgroundColor: theme.colors.gray[3],

    alignItems: "center",
    justifyContent: "center",
  },

  newsTypo: {
    position: "relative",
    height: smallScreen ? "2.5rem" : "4.5rem",
    overflow: "hidden",

    lineHeight: 1.2,

    "&::after": {
      content: '""',
      position: "absolute",
      bottom: 0,
      left: 0,
      width: "100%",
      height: "1.5rem",
      background: "linear-gradient(to bottom, rgba(256, 256, 256, 0), rgba(256, 256, 256, 1) 100%)",
    },
  },

  content: {
    lineHeight: 1.5,

    "*": {
      marginBottom: "0px !important",
    },
  },

  footerGroup: {
    marginTop: "0.5rem",
  },
}));
