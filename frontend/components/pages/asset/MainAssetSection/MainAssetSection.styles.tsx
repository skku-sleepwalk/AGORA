import { createStyles } from "@mantine/core";

export const useMainAssetSectionStyles = createStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    width: "100%",

    alignItems: "center",
    gap: "1.5rem",
  },

  text: {
    display: "flex",
    width: "80%",

    fontSize: "1.5rem",

    justifyContent: "flex-start",
  },

  wrapper: {
    display: "flex",
    flexWrap: "wrap",
    width: "80%",

    justifyContent: "space-between",
    gap: "1rem",
  },
}));
