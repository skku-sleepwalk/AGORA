import { createStyles } from "@mantine/core";

export interface GameReviewSectionStylesProps {
  smallScreen: boolean;
}

export const useGameReviewSectionStyles = createStyles(
  (theme, { smallScreen }: GameReviewSectionStylesProps) => ({
    all: {
      cursor: "default",
    },

    reviewSection: {
      width: "100%",
      height: "100%",
      padding: "2rem 1rem",
    },

    myReviewGroup: {
      display: "flex",
      alignItems: "flex-start",
      flexWrap: "nowrap",

      marginLeft: "1rem",
      marginRight: "1rem",
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
