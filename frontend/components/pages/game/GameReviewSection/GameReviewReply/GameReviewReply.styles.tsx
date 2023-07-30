import { createStyles } from "@mantine/core";

export interface GameReviewProps {
  smallScreen: boolean;
}

export const useGameReviewReplyStyles = createStyles((theme, { smallScreen }: GameReviewProps) => ({
  stack: {
    margin: "1rem 0rem",
    marginLeft: "0.5rem",
  },

  reviewTypo: {
    lineHeight: 1.2,
  },

  limitHeight: {
    maxHeight: smallScreen ? "4.1rem" : "5.9rem",
    overflow: "hidden",
  },

  content: {
    lineHeight: 1.5,

    "*": {
      marginBottom: "0px !important",
    },
  },

  viewMoreButton: {
    paddingTop: "0.3rem",
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

  menuItem: {
    padding: 5,
  },

  marginLeft: {
    marginLeft: smallScreen ? "2.9rem" : "4rem",
  },
}));
