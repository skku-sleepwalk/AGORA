import { createStyles } from "@mantine/core";

export const useGameReviewSectionStyles = createStyles((theme) => ({
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
    border: `0.0625rem solid ${theme.colors.gray[4]}`,
    borderRadius: theme.radius.sm,

    ".mantine-TextInput-input": {
      backgroundColor: "transparent",
      border: "none",
    },
  },

  marginLeftRight: {
    marginLeft: "1.5rem",
    marginRight: "1.5rem",
  },
}));
