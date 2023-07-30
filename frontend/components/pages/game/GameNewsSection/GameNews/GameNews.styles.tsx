import { createStyles } from "@mantine/core";

export interface GameNewsProps {
  smallScreen: boolean;
}

export const useGameNewsStyles = createStyles((theme, { smallScreen }: GameNewsProps) => ({
  gameNewsSection: {
    width: "100%",
    height: "100%",
    padding: "0.2rem 0.2rem",
    paddingRight: "1rem",
  },

  group: {
    flexWrap: "nowrap",
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

  stack: {
    flexGrow: 1,
    padding: "0.7rem 0rem 0.3rem",
  },

  newsTypo: {
    position: "relative",
    height: smallScreen ? "2.5rem" : "2.9rem",
    overflow: "hidden",

    lineHeight: 1.2,

    "&::after": {
      content: '""',
      position: "absolute",
      bottom: 0,
      left: 0,
      width: "100%",
      height: "1.5rem",
      background: "linear-gradient(to bottom, rgba(252, 252, 254, 0), rgba(252, 252, 254, 1) 100%)",
    },
  },

  content: {
    lineHeight: 1.5,

    "*": {
      marginBottom: "0px !important",
    },
  },
}));
