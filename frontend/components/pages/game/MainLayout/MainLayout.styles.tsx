import { createStyles } from "@mantine/core";

export const useMainLayoutStyles = createStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    gap: 83,
    height: "100%",
  },

  tapContainer: {
    position: "fixed",
    width: "100%",
    height: "3rem",
  },

  upContainer: {
    marginTop: "3rem",
    width: "100%",
    height: "32rem",
  },

  mainContainer: {
    width: "100%",
    margin: 0,
  },
}));
