import { createStyles } from "@mantine/core";

export const useAssetCarouselStyles = createStyles((theme) => ({
  backgroundImage: {
    display: "flex",
    alignItems: "center",
    textDecoration: "none",

    "&:hover": {
      textDecoration: "none",
    },
  },

  imageContainer: {
    width: "100%",
    height: "100%",
    padding: 0,
    borderRadius: "1rem",
    backgroundColor: theme.colors.gray[2],
  },

  image: {
    height: "100%",
    ".mantine-Image-imageWrapper, .mantine-Image-figure, .mantine-Image-image": {
      height: "100%",
    },
  },

  carousel: {
    width: "100%",
    height: "100%",
    ".mantine-Carousel-root, .mantine-Carousel-container, .mantine-Carousel-viewport": {
      height: "100%",
    },
    ".mantine-Carousel-control": {
      backgroundColor: "transparent",
      border: "none",
      boxShadow: "none",
    },
    ".mantine-Carousel-indicator": {
      width: "2rem",
      height: "0.4rem",
      transition: "width 250ms ease",

      "&[data-active]": {
        width: "3rem",
        backgroundColor: theme.colors.blue[3],
      },
    },

    [theme.fn.smallerThan(820)]: {
      ".mantine-Carousel-indicators": {
        gap: "0.3rem",
      },

      ".mantine-Carousel-indicator": {
        width: "1.3rem",
        height: "0.26rem",

        "&[data-active]": {
          width: "2rem",
        },
      },
    },

    [theme.fn.smallerThan(540)]: {
      ".mantine-Carousel-indicators": {
        gap: "0.15rem",
      },

      ".mantine-Carousel-indicator": {
        width: "0.65rem",
        height: "0.13rem",

        "&[data-active]": {
          width: "1rem",
        },
      },
    },
  },
}));
