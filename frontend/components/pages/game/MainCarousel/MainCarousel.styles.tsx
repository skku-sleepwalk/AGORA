import { createStyles } from "@mantine/core";

export interface MainCarouselStyles {
  width?: number;
}

export const useMainCarouselStyles = createStyles(
  (theme, { width = 1440 }: MainCarouselStyles) => ({
    backgroundImage: {
      position: "relative",
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
      position: "absolute",
      left: `${(7 * width) / 1440}rem`,
      top: `${(10 * width) / 1440}rem`,
    },

    gameExplain: {
      width: `${(37 * width) / 1440}rem`,
      fontSize: `${(1.3 * width) / 1440}rem`,
      lineHeight: 1.5,
      color: "white",
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
        width: `${(2 * width) / 1440}rem`,
        height: `${(0.4 * width) / 1440}rem`,
        transition: "width 250ms ease",

        "&[data-active]": {
          width: `${(3 * width) / 1440}rem`,
          backgroundColor: theme.colors.blue[3],
        },
      },
    },
  })
);
