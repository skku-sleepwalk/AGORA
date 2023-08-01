import { createStyles } from "@mantine/core";

export interface GameBoardSectionStylesProps {
  smallScreen: boolean;
}

export const useGameBoardSectionStyles = createStyles(
  (theme, { smallScreen }: GameBoardSectionStylesProps) => ({
    all: {
      cursor: "default",
    },

    boardSection: {
      width: "100%",
      height: "100%",
      padding: "2rem 1rem",
    },

    stack: {
      padding: smallScreen ? "0rem 0.5rem" : "0rem 1rem",
    },

    selectGroup: {
      marginTop: "1rem",
    },

    writeButton: {
      height: "2.25rem",
      paddingLeft: "0.7rem",
      paddingRight: "0.7rem",

      borderRadius: "15px",

      backgroundColor: theme.colors.blue[5],
    },

    Search: {
      height: "2rem",
      flexGrow: 1,

      ".mantine-TextInput-wrapper": {
        borderRadius: "15px",
        border: "none",
        backgroundColor: "#F3F3F3",
      },
      ".mantine-TextInput-input": {
        border: "none",
        backgroundColor: "transparent",
      },
    },
  })
);
