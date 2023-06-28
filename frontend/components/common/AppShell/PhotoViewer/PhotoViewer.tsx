import { useState } from 'react';
import { Carousel, Embla, useAnimationOffsetEffect } from '@mantine/carousel';
import { useListState, useDisclosure } from '@mantine/hooks';
import { Modal, Group, Image, Button, Box, Center } from '@mantine/core';
import { IconChevronRight, IconChevronLeft } from "@tabler/icons-react";
import { usePhotoViewerStyles } from './PhotoViewer.styles';
import { PhotoSrcValues } from './PhotoViewer.constants';

export function PhotoViewer() {
  const { classes, cx } = usePhotoViewerStyles();

  const [values, handlers] = useListState(PhotoSrcValues);
  const [opened, { open, close }] = useDisclosure(false);
  
  const TRANSITION_DURATION = 200;
  const [embla, setEmbla] = useState<Embla | null>(null);

  useAnimationOffsetEffect(embla, TRANSITION_DURATION);

  const Photos = values.map((value, index) => ( // map : 각 요소에 대하여 그 값을 반환
      <Carousel.Slide size={'49.375rem'}>
        <Center className={classes.carouselSlide}>
          <Image width={'43.125rem'} height={'28.125rem'} fit="contain" src={value.src} />
        </Center>
      </Carousel.Slide>
    ));

  return (
    <>
      <Modal opened={opened} onClose={close}
        size={'49.375rem'}
        padding={0}
        centered
        className={classes.modal}
        withCloseButton={false}>
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
      </Modal>
      <Group position="center">
          <Button onClick={open}>Image</Button>
      </Group>
    </>
  );
}