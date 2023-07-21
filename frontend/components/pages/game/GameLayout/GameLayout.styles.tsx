import { createStyles } from "@mantine/core";

export const useGameLayoutStyles = createStyles((theme) => ({
  container: {
    display: "flex",
    width: "100%",
    height: "100%",
  },

  tapContainer: {
    position: "relative",
    width: "100%",
    height: "3rem",
    zIndex: 100,
  },

  rightMainContainer: {},

  mainContainer: {
    width: "100%",
    margin: 0,
  },

  rightContainer: {},
}));
