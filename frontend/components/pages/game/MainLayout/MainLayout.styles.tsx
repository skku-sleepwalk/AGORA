import { createStyles } from "@mantine/core";

export const useMainLayoutStyles = createStyles((theme) => ({
  container: {
    // display: "flex",
    // flexDirection: "column",
    width: "100%",
  },

  tapContainer: {
    position: "relative",
    width: "100%",
    height: "3rem",
  },

  upContainer: {
    width: "100%",
    height: "32rem",
  },

  mainContainer: {
    width: "100%",
    margin: 0,
  },
}));
