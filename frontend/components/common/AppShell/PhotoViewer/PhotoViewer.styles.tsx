import { createStyles } from "@mantine/core";

export const usePhotoViewerStyles = createStyles((theme) => ({
modal: {
  ".mantine-Modal-content": {backgroundColor: 'transparent', boxShadow: 'none'},
  ".mantine-Modal-body": {padding: 0},
},
carousel: {
  maxWidth: 690,
  ".mantine-Carousel-control": {backgroundColor: 'transparent', border: 'none'}
},
}));