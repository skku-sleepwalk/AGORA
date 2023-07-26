import { createStyles } from "@mantine/core";

export interface GameReviewSectionProps {
  smallScreen: boolean;
}

export const useGameReviewSectionStyles = createStyles(
  (theme, { smallScreen }: GameReviewSectionProps) => ({
    reviewSection: {
      display: "flex",
      width: "100%",
      height: "100%",

      padding: "2rem 1rem",
    },

    reviewStack: {
      flexGrow: 1,
    },

    reviewInput: {
      height: smallScreen ? "2rem" : "auto",
      border: `0.0625rem solid ${theme.colors.gray[4]}`,
      borderRadius: theme.radius.sm,

      ".mantine-TextInput-input": {
        backgroundColor: "transparent",
        border: "none",
        "::placeholder": {
          fontSize: smallScreen ? "0.8rem" : "auto",
        },
      },
    },

    marginLeftRight: {
      marginLeft: "1.5rem",
      marginRight: "1.5rem",
    },
  })
);
