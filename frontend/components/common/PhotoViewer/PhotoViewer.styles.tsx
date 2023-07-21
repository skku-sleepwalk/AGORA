import { createStyles } from "@mantine/core";

export const usePhotoViewerStyles = createStyles((theme) => ({
  carousel: {
    ".mantine-Carousel-control": {
      backgroundColor: "transparent",
      border: "none",
      boxShadow: "none",
    },
    ".mantine-Carousel-indicator": {
      width: "1.5rem",
      transition: "width 250ms ease",

      "&[data-active]": {
        width: "2.5rem",
        backgroundColor: "white",
      },
    },
  },

  carouselSlide: {
    padding: "0px 50px 35px",
  },
}));
