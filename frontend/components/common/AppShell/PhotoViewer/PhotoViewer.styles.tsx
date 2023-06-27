import { createStyles } from "@mantine/core";

export const usePhotoViewerStyles = createStyles((theme) => ({
modal: {
  ".mantine-Modal-content": {backgroundColor: 'transparent', boxShadow: 'none'},
},

carousel: {
  ".mantine-Carousel-control": {backgroundColor: 'transparent', border: 'none', boxShadow: 'none'},
},

carouselSlide: {
  width: 710,
  height: 450,
  padding: '0px 10px',
},

}));