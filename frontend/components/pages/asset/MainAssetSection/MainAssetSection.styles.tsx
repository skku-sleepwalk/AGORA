import { createStyles } from "@mantine/core";

export const useMainAssetSectionStyles = createStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    width: "100%",

    alignItems: "center",
    gap: "0.5rem",
  },

  text: {
    display: "flex",
    width: "80%",

    fontSize: "1.5rem",

    justifyContent: "flex-start",
  },

  wrapper: {
    width: "80%",
  },

  carousel: {
    ".mantine-Carousel-viewport": {
      paddingLeft: "0.5rem",
    },
    ".mantine-Carousel-container": {
      alignItems: "center",
    },
    ".mantine-Carousel-control": {
      "&[data-inactive]": {
        opacity: 0,
        cursor: "default",
      },
    },
  },
}));
