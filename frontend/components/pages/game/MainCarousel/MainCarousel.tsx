import { useEffect, useRef, useState } from "react";
import {
  Avatar,
  BackgroundImage,
  Image,
  Box,
  Group,
  Stack,
  Text,
  Center,
  Container,
} from "@mantine/core";
import { useListState } from "@mantine/hooks";
import { Carousel, Embla, useAnimationOffsetEffect } from "@mantine/carousel";
import emblaCarouselAutoplay from "embla-carousel-autoplay";
import { GameSrcValues } from "./MainCarousel.constants";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { useMainCarouselStyles } from "./MainCarousel.styles";

function processString(input: string): string {
  if (!input) {
    return "";
  }

  if (input.length <= 75) {
    return input;
  }

  let processedString = input.slice(0, 75);
  if (input.length > 150) {
    processedString += "...";
  }
  return processedString;
}

interface MainCarouselProps {
  isMain?: boolean;
  isInfo?: boolean;
  imgUrls?: string[];
}

export function MainCarousel({ isMain, isInfo, imgUrls }: MainCarouselProps) {
  // 배경 이미지 내부, 태그들의 크기/위치 자동 조절 용
  const widthRef = useRef<HTMLAnchorElement>(null);
  const [width, setWidth] = useState<number>(1440);
  useEffect(() => {
    if (widthRef.current) {
      setWidth(widthRef.current.clientWidth);
    }
  }, []);

  const { classes, cx } = useMainCarouselStyles({ width });

  const TRANSITION_DURATION = 200;
  const [embla, setEmbla] = useState<Embla | null>(null);
  useAnimationOffsetEffect(embla, TRANSITION_DURATION);

  const autoplay = useRef(emblaCarouselAutoplay({ delay: 4000 }));

  const [values] = useListState(imgUrls?.map((url) => ({ src: url })) || GameSrcValues);

  const GameCarouselSlides = values.map((value) => (
    <Carousel.Slide>
      {isMain && (
        <BackgroundImage
          className={classes.backgroundImage}
          ref={widthRef}
          component="a"
          href={value.href}
          src={value.src}
          h={"100%"}
        >
          <Stack className={classes.gameIntro} spacing={`${(2 * width) / 1440}rem`}>
            <Group>
              <Avatar radius={"md"} size={`${(2.4 * width) / 1440}rem`} src={value.src} />
              <Text color="#fff" size={`${(1.8 * width) / 1440}rem`}>
                {value.gameName}
              </Text>
            </Group>
            <Box className={classes.gameExplain}>{processString(value.gameExplain)}</Box>
          </Stack>
        </BackgroundImage>
      )}
      {isInfo && (
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
      )}
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
        <IconChevronLeft color="white" size={`${(3 * width) / 1440}rem`}></IconChevronLeft>
      }
      nextControlIcon={
        <IconChevronRight color="white" size={`${(3 * width) / 1440}rem`}></IconChevronRight>
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
