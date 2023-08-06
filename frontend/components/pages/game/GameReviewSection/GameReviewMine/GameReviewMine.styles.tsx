import { createStyles } from "@mantine/core";

export interface GameReviewMineStylesProps {
  smallScreen: boolean;
}

export const useGameReviewMineStyles = createStyles(
  (theme, { smallScreen }: GameReviewMineStylesProps) => ({
    stack: {
      marginTop: "0.2rem",
      marginBottom: "1rem",
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

    loader: {
      display: "flex",
      width: "100%",

      justifyContent: "center",
    },
  })
);
