import { createStyles } from "@mantine/core";

export const useMainCarouselStyles = createStyles((theme) => ({
  backgroundImage: {
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

  gameIntro: {
    paddingLeft: "4rem",
    paddingTop: "9.5rem",
  },

  gameExplain: {
    width: "37rem",
    fontSize: "1.3rem",
    lineHeight: 1.5,
    color: "white",
  },

  carousel: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    ".mantine-Carousel-container, .mantine-Carousel-viewport": {
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
  },
}));
