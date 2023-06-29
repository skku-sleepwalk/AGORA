import { createStyles } from "@mantine/core";

export const useCommunityLayoutStyles = createStyles((theme) => ({
  container: {
    display: "flex",
    width: "100%",
    gap: 83,
  },

  leftMainContainer: {
    display: "flex",
    padding: 20,
    flexGrow: 1,
    gap: 39,
  },

  leftContainer: {
    margin: 0,
    width: 260,
  },

  mainContainer: {
    flexGrow: 1,
    margin: 0,
  },

  rightContainer: {
    width: 260,
    margin: 0,
  },
}));
