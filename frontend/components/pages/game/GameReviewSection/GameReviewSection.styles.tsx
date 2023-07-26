import { createStyles } from "@mantine/core";

export interface GameReviewSectionProps {
  smallScreen: boolean;
}

export const useGameReviewSectionStyles = createStyles(
  (theme, { smallScreen }: GameReviewSectionProps) => ({
    reviewSection: {
      width: "100%",
      height: "100%",
      padding: "2rem 1rem",
      backgroundColor: "white",
    },

    myReviewGroup: {
      display: "flex",
      alignItems: "flex-start",
      flexWrap: "nowrap",

      marginLeft: "1.5rem",
      marginRight: "1.5rem",
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
