import { createStyles } from "@mantine/core";

export const usePhotoViewerStyles = createStyles((theme) => ({
modal: {
  ".mantine-Modal-content": {backgroundColor: 'transparent', boxShadow: 'none'},
  ".mantine-Modal-body": {padding: 0},
},
carousel: {
  ".mantine-Carousel-control": {backgroundColor: 'transparent', border: 'none'}
},
}));