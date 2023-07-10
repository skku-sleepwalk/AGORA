import { useState } from 'react';
import { Carousel, Embla, useAnimationOffsetEffect } from '@mantine/carousel';
import { useListState } from '@mantine/hooks';
import { Image, Center } from '@mantine/core';
import { IconChevronRight, IconChevronLeft } from "@tabler/icons-react";
import { usePhotoViewerStyles } from './PhotoViewer.styles';
import { PhotoSrcValues } from './PhotoViewer.constants';

export function PhotoViewer() {
  const { classes, cx } = usePhotoViewerStyles();

  const [values] = useListState(PhotoSrcValues);
  
  const TRANSITION_DURATION = 200;
  const [embla, setEmbla] = useState<Embla | null>(null);

  useAnimationOffsetEffect(embla, TRANSITION_DURATION);

  const Photos = values.map((value) => (
      <Carousel.Slide size={'49.375rem'} >
        <Center 
          className={classes.carouselSlide}
          onClick={(e) => {
            e.stopPropagation();
          }}>
          <Image width={'43.125rem'} height={'28.125rem'} fit="contain" src={value.src} />
        </Center>
      </Carousel.Slide>
    ));

  return (
    <Carousel
      className={classes.carousel}
      getEmblaApi={setEmbla}
      withIndicators
      loop
      align={'center'}
      previousControlIcon={<IconChevronLeft color='white' size={'2.5rem'}></IconChevronLeft>} 
      nextControlIcon={<IconChevronRight color='white' size={'2.5rem'}></IconChevronRight>}>
      {Photos}
    </Carousel>
  );
}