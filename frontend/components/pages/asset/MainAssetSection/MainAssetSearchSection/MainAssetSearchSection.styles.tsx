import { createStyles } from "@mantine/core";

export const useMainAssetSearchSectionStyles = createStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    width: "100%",

    alignItems: "center",
    gap: "2rem",
  },

  text: {
    display: "flex",
    width: "80%",

    fontSize: "1.3rem",

    justifyContent: "flex-start",
  },

  wrapper: {
    display: "flex",
    flexWrap: "wrap",
    width: "80%",

    justifyContent: "space-between",
    gap: "2rem",
  },
}));
