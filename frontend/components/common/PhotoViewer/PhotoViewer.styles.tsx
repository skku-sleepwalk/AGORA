import { createStyles } from "@mantine/core";

export const usePhotoViewerStyles = createStyles((theme) => ({
carousel: {
  ".mantine-Carousel-control": {
    backgroundColor: 'transparent', 
    border: 'none', 
    boxShadow: 'none'
  },
},

carouselSlide: {
  padding: '0px 50px 35px',
},

}));