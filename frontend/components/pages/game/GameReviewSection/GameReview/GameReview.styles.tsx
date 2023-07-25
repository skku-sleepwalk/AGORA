import { createStyles } from "@mantine/core";

export const useGameReviewStyles = createStyles((theme) => ({
  stack: {
    margin: "1rem 1.5rem",
  },

  reviewTypo: {
    lineHeight: 1.2,
  },

  limitHeight: {
    height: "5.9rem",
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

  marginLeft: {
    marginLeft: "4rem",
  },
}));
