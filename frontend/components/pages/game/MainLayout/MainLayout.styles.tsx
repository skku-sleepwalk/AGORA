import { createStyles } from "@mantine/core";

export const useMainLayoutStyles = createStyles((theme) => ({
  container: {
    width: "100%",
    height: "100%",
  },

  tapContainer: {
    position: "fixed",
    width: "100%",
    height: "3rem",
    zIndex: 50,
    // top: 69,
  },

  upMainContainer: {
    position: "relative",
    top: "3rem",
    width: "100%",
  },

  upContainer: {
    aspectRatio: "20 / 7",
    width: "100%",
  },

  mainContainer: {
    width: "100%",
    margin: 0,
  },
}));
