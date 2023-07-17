import { createStyles } from "@mantine/core";

export const usePostViewLayoutStyles = createStyles((theme) => ({
  container: {
    display: "flex",
    width: "100%",
    height: "100%",
  },

  mainContainer: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
  },

  rightContainer: {
    width: 260,
    margin: 0,
  },
}));
