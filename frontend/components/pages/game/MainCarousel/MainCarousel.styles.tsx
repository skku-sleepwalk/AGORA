import { createStyles } from "@mantine/core";

export const useMainCarouselStyles = createStyles((theme) => ({
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

  gameIntro: {
    marginLeft: "7rem",
    marginBottom: "3.5rem",
    gap: "2rem",

    [theme.fn.smallerThan(820)]: {
      marginLeft: "4.6rem",
      marginBottom: "2.7rem",
      gap: "1.3rem",
    },

    [theme.fn.smallerThan(540)]: {
      marginLeft: "2.3rem",
      marginBottom: "0.65rem",
      gap: "0.65rem",
    },
  },

  gameAvatar: {
    minWidth: "3rem",
    width: "3rem",
    height: "3rem",

    [theme.fn.smallerThan(820)]: {
      minWidth: "2rem",
      width: "2rem",
      height: "2rem",
    },

    [theme.fn.smallerThan(540)]: {
      minWidth: "1rem",
      width: "1rem",
      height: "1rem",
    },
  },

  gameName: {
    fontSize: "1.8rem",

    [theme.fn.smallerThan(820)]: {
      fontSize: "1.2rem",
    },

    [theme.fn.smallerThan(540)]: {
      fontSize: "0.6rem",
    },
  },

  gameExplain: {
    width: "37rem",
    fontSize: "1.3rem",
    lineHeight: 1.5,
    color: "white",

    [theme.fn.smallerThan(820)]: {
      width: "24.6rem",
      fontSize: "0.86rem",
    },

    [theme.fn.smallerThan(540)]: {
      width: "12.3rem",
      fontSize: "0.43rem",
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
