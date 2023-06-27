import { Carousel } from '@mantine/carousel';
import { useListState, useDisclosure } from '@mantine/hooks';
import { Modal, Group, Image, Button } from '@mantine/core';
import { IconChevronRight, IconChevronLeft } from "@tabler/icons-react";
import { usePhotoViewerStyles } from './PhotoViewer.styles';
import { PhotoSrcValues } from './PhotoViewer.constants';

export function PhotoViewer() {
  const { classes, cx } = usePhotoViewerStyles();

  const [values, handlers] = useListState(PhotoSrcValues);
  const [opened, { open, close }] = useDisclosure(false);

  const Photos = values.map((value, index) => ( // map : 각 요소에 대하여 그 값을 반환
      <Carousel.Slide size={800} gap={'xs'}>
        <Image width={690} height={450} fit="contain" src={value.src} />
      </Carousel.Slide>
    ));

  return (
    <>
      <Modal opened={opened} onClose={close}
        size={690}
        centered
        className={classes.modal}
        withCloseButton={false}>
        <Carousel
          className={classes.carousel}
          mx={'auto'}
          withIndicators
          align={'center'}
          previousControlIcon={<IconChevronLeft color='white'></IconChevronLeft>} 
          nextControlIcon={<IconChevronRight color='white'></IconChevronRight>}>
          {Photos}
        </Carousel>
      </Modal>
      <Group position="center">
          <Button onClick={open}>Image</Button>
      </Group>
    </>
  );
}