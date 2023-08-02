import { createStyles } from "@mantine/core";

export interface GameBoardDetailViewerStylesProps {
  smallScreen: boolean;
}

export const useGameBoardDetailViewerStyles = createStyles(
  (theme, { smallScreen }: GameBoardDetailViewerStylesProps) => ({
    boardDetailViewer: {
      width: "100%",
      height: "100%",
      padding: "1rem 1.5rem",

      cursor: "default",
    },

    userStack: {
      flexGrow: 1,
    },

    marginLeft: {
      marginLeft: smallScreen ? "0.7rem" : "1rem",
    },

    content: {
      lineHeight: 1.5,
      padding: 0,
      "*": {
        marginBottom: "0px !important",
      },
    },

    footerGroup: {
      marginTop: "0.7rem",
      paddingLeft: smallScreen ? "0.7rem" : "1rem",
      paddingBottom: "0.5rem",

      borderBottom: `1px solid ${theme.black}`,
    },
  })
);
