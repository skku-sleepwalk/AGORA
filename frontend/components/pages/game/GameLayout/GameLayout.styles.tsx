import { createStyles } from "@mantine/core";

export const useGameLayoutStyles = createStyles((theme) => ({
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
    overflow: "hidden",
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

  tapContainer: {
    position: "relative",
    width: "100%",
    height: "3rem",
  },

  bottomContainer: {
    display: "flex",
    flexWrap: "nowrap",
    width: "100%",
    padding: 20,
    gap: 40,
  },

  mainContainer: {
    flexGrow: 1,
    width: 800,
    margin: 0,
  },

  rightContainer: {
    width: 300,
    margin: 0,
  },
}));
