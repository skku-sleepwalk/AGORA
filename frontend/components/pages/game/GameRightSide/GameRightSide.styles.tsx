import { createStyles } from "@mantine/core";

export const useGameRightSideStyles = createStyles((theme) => ({
  stack: {
    height: "100%",

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

    "&:hover": {
      cursor: "pointer",
    },
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
}));
