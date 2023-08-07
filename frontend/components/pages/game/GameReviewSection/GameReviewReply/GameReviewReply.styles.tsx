import { createStyles } from "@mantine/core";

export interface GameReviewStylesProps {
  smallScreen: boolean;
}

export const useGameReviewReplyStyles = createStyles(
  (theme, { smallScreen }: GameReviewStylesProps) => ({
    stack: {
      margin: "1rem 0rem",
      marginLeft: "0.5rem",
    },

    reviewTypo: {
      lineHeight: 1.2,
    },

    spoiler: {
      ".mantine-Spoiler-control": {
        marginTop: "0.5rem",
        color: theme.colors.gray[4],

        "&:hover": {
          textDecoration: "none",
        },
      },
    },

    content: {
      lineHeight: 1.5,

      "*": {
        marginBottom: "0px !important",
      },
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

    dotButton: {
      height: 25,
      borderRadius: 5,

      "&:hover": {
        backgroundColor: theme.colors.gray[1],
      },
    },

    menuItem: {
      padding: 5,
    },

    marginLeft: {
      marginLeft: smallScreen ? "2.9rem" : "4rem",
    },
  })
);
