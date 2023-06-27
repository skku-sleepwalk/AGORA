import { Carousel } from '@mantine/carousel';
import { usePhotoViewerStyles } from './PhotoViewer.styles';

export function PhotoViewer() {
  const { classes, cx } = usePhotoViewerStyles();

  return (
    <Carousel maw={690} mx="auto" height={450} slideGap="md" loop withIndicators>
      <Carousel.Slide>1</Carousel.Slide>
      <Carousel.Slide>2</Carousel.Slide>
      <Carousel.Slide>3</Carousel.Slide>
    </Carousel>
  );
}