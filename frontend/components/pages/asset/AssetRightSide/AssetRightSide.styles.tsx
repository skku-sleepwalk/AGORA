import { createStyles } from "@mantine/core";

export const useAssetRightSideStyles = createStyles((theme) => ({
  box: {
    display: "flex",
    flexWrap: "wrap",

    height: "100%",
    alignContent: "space-between",

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

  marginTop: {
    position: "relative",
    marginTop: "0.55rem",
  },
}));
