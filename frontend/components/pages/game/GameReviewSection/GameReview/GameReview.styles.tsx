import { createStyles } from "@mantine/core";

export interface GameReviewStylesProps {
  smallScreen: boolean;
}

export const useGameReviewStyles = createStyles(
  (theme, { smallScreen }: GameReviewStylesProps) => ({
    stack: {
      margin: "1rem 1rem",
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

    marginLeft: {
      marginLeft: smallScreen ? "2.9rem" : "4rem",
    },

    myReviewGroup: {
      display: "flex",
      alignItems: "flex-start",
      flexWrap: "nowrap",

      margin: "1rem 0rem",
      marginLeft: "0.5rem",
    },

    reviewEditorBox: {
      flexGrow: 1,
      width: "100%",
    },

    reviewNo: {
      width: "100%",

      ".mantine-TextInput-root, .mantine-TextInput-wrapper, .mantine-TextInput-input": {
        height: smallScreen ? 30 : 46,
      },

      ".mantine-TextInput-input": {
        "::placeholder": {
          fontSize: smallScreen ? "0.8rem" : "auto",
        },
      },
    },
  })
);
