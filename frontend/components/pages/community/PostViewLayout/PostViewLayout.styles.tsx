import { createStyles } from "@mantine/core";

export const usePostViewLayoutStyles = createStyles((theme) => ({
  container: {
    display: "flex",
    width: "100%",
    gap: 83,
    height: "100%",
  },

  mainContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 20,
    flexGrow: 1,
    gap: 39,
  },

  rightContainer: {
    width: 260,
    margin: 0,
  },
}));
