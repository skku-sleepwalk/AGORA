import { createStyles } from "@mantine/core";

export interface GameBoardCommentStylesProps {
  smallScreen: boolean;
}

export const useGameBoardCommentStyles = createStyles(
  (theme, { smallScreen }: GameBoardCommentStylesProps) => ({
    stack: {
      margin: "1rem 1rem",
    },

    userStack: {
      flexGrow: 1,
    },

    commentTypo: {
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

    marginLeft: {
      marginLeft: smallScreen ? "2.9rem" : "4rem",
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
  })
);
