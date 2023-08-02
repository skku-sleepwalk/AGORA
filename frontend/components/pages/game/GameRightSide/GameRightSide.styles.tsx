import { createStyles } from "@mantine/core";

interface GameRightSideStylesProps {
  priceWidth: number | undefined;
}

export const useGameRightSideStyles = createStyles(
  (theme, { priceWidth }: GameRightSideStylesProps) => ({
    box: {
      display: "flex",
      flexWrap: "wrap",

      height: "100%",
      alignContent: "space-between",

      cursor: "default",
    },

    container: {
      width: "100%",
    },

    alignCenter: {
      display: "flex",
      alignItems: "center",
    },

    containerPadding: {
      padding: "1rem 0.3rem",
    },

    heartFilled: {
      marginRight: "0.2rem",
    },

    shortCutsGroup: {
      alignItems: "flex-start",
    },

    text: {
      maxWidth: "4rem",
      textAlign: "center",
      overflowWrap: "break-word",
    },

    marginTop: {
      position: "relative",
      marginTop: "0.55rem",
    },

    realPrice: {
      position: "absolute",
      bottom: "1.65rem",
    },

    percent: {
      position: "absolute",
      right: priceWidth !== undefined ? `${priceWidth / 16 + 0.4}rem` : "7.2rem",
      padding: "0.1rem 0.2rem",

      backgroundColor: theme.colors.pink[3],
      borderRadius: theme.radius.sm,
    },

    sellButton: {
      width: "10rem",
      height: "3.2rem",
      flexGrow: 1,
    },

    passButton: {
      width: "7rem",
      height: "3.2rem",
    },
  })
);
