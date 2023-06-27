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
      <Carousel.Slide size={710}>
        <Center className={classes.carouselSlide}>
          <Image fit="contain" src={value.src} />
        </Center>
      </Carousel.Slide>
    ));

  return (
    <>
      <Modal opened={opened} onClose={close}
        size={710}
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
          previousControlIcon={<IconChevronLeft color='white' size={30}></IconChevronLeft>} 
          nextControlIcon={<IconChevronRight color='white' size={30}></IconChevronRight>}>
          {Photos}
        </Carousel>
      </Modal>
      <Group position="center">
          <Button onClick={open}>Image</Button>
      </Group>
    </>
  );
}