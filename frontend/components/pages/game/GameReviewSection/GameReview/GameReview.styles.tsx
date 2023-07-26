import { createStyles } from "@mantine/core";

export interface GameReviewProps {
  smallScreen: boolean;
}

export const useGameReviewStyles = createStyles((theme, { smallScreen }: GameReviewProps) => ({
  stack: {
    margin: "1rem 1.5rem",
  },

  reviewTypo: {
    lineHeight: 1.2,
  },

  limitHeight: {
    height: smallScreen ? "4.1rem" : "5.9rem",
    overflow: "hidden",
  },

  viewMoreButton: {
    position: "absolute",
    bottom: -2,
    right: 0,
    paddingLeft: "7rem",
    backgroundColor: "#fcfcfe",
    boxShadow: "-50px 0px 5px #fcfcfe",
  },

  button: {
    "&:hover": {
      backgroundColor: theme.colors.gray[1],
    },

    ".mantine-Button-inner": {
      fontWeight: "normal",
    },
  },

  buttonPadding: {
    padding: "0rem 0.5rem",
  },

  marginLeft: {
    marginLeft: smallScreen ? "2.9rem" : "4rem",
  },
}));
