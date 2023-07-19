import { createStyles } from "@mantine/core";

export const useMainCarouselStyles = createStyles((theme) => ({
  backgroundImage: {
    textDecoration: "none",
    "&:hover": {
      textDecoration: "none",
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
