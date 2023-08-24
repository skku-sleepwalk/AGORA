import { useRef, useState } from "react";
import { useAssetCarouselStyles } from "./AssetCarousel.styles";
import { Carousel, Embla, useAnimationOffsetEffect } from "@mantine/carousel";
import { GameSrcValues } from "../../game/MainCarousel/MainCarousel.constants";
import emblaCarouselAutoplay from "embla-carousel-autoplay";
import { useListState, useMediaQuery } from "@mantine/hooks";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { Container, Image } from "@mantine/core";

interface AssetCarouselProps {
  imgUrls?: string[] | undefined;
}

export function AssetCarousel({ imgUrls }: AssetCarouselProps) {
  const { classes, cx } = useAssetCarouselStyles();

  const TRANSITION_DURATION = 200;
  const [embla, setEmbla] = useState<Embla | null>(null);
  useAnimationOffsetEffect(embla, TRANSITION_DURATION);
  const autoplay = useRef(emblaCarouselAutoplay({ delay: 4000 }));

  const [values] = useListState(imgUrls?.map((url) => ({ src: url })) || GameSrcValues);

  const lgScreen = useMediaQuery("(max-width: 820px)");
  const smScreen = useMediaQuery("(max-width: 540px)");

  const GameCarouselSlides = values.map((value) => (
    <Carousel.Slide>
      <Container className={classes.imageContainer}>
        <Image
          className={classes.image}
          width={"100%"}
          height={"100%"}
          radius={"lg"}
          fit="contain"
          src={value.src}
        />
      </Container>
    </Carousel.Slide>
  ));

  return (
    <Carousel
      className={classes.carousel}
      slideSize="100%"
      slideGap="md"
      loop
      draggable={false}
      withIndicators
      previousControlIcon={
        <IconChevronLeft
          color="white"
          size={smScreen ? "1rem" : lgScreen ? "2rem" : "3rem"}
        ></IconChevronLeft>
      }
      nextControlIcon={
        <IconChevronRight
          color="white"
          size={smScreen ? "1rem" : lgScreen ? "2rem" : "3rem"}
        ></IconChevronRight>
      }
      getEmblaApi={setEmbla}
      plugins={[autoplay.current]}
      onMouseEnter={autoplay.current.stop}
      onMouseLeave={autoplay.current.reset}
    >
      {GameCarouselSlides}
    </Carousel>
  );
}
