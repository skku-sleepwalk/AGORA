import { createStyles } from "@mantine/core";

export const useMainLayoutStyles = createStyles((theme) => ({
  container: {
    width: "100%",
  },

  tapContainer: {
    position: "relative",
    width: "100%",
    height: "3rem",
    zIndex: 100,
  },

  upContainer: {
    aspectRatio: "5 / 2",
    width: "100%",
  },

  mainContainer: {
    width: "100%",
    margin: 0,
  },
}));
