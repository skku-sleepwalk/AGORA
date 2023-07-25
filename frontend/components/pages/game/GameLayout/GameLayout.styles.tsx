import { createStyles } from "@mantine/core";

export interface GameLayoutStyleProps {
  rightSectionMove: number;
}

export const useGameLayoutStyles = createStyles(
  (theme, { rightSectionMove }: GameLayoutStyleProps) => ({
    container: {
      display: "flex",
      flexWrap: "wrap",
      width: "100%",
    },

    topContainer: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-between",
      width: "100%",
      height: "auto",
      padding: 40,
      paddingTop: 60,
      gap: 20,
    },

    PhotoContainer: {
      position: "relative",
      margin: 0,
      aspectRatio: "8 / 5",
      width: 800,
    },

    infoContainer: {
      margin: 0,
      width: 430,
      height: 500,
      flexGrow: 1,
    },

    tapContainer_S: {
      width: "100%",
      height: "3rem",
    },

    tapContainer_F: {
      position: "fixed",
      width: "100%",
      height: "3rem",
      zIndex: 100,
    },

    bottomContainer: {
      display: "flex",
      flexWrap: "nowrap",
      width: "100%",
      height: "100%",
      padding: 40,
      gap: 40,
    },

    paddingTop: {
      paddingTop: 88,
    },

    mainContainer_B: {
      flexGrow: 1,
      flexShrink: 0,
      width: 700,
      margin: 0,
    },

    rightContainer_B: {
      flexShrink: 0,
      width: "25rem",
      height: "37rem",

      margin: 0,
      marginTop: rightSectionMove,
    },

    mainContainer_S: {
      flexGrow: 1,
      margin: 0,
    },

    rightContainer_S: {
      display: "none",
    },
  })
);
