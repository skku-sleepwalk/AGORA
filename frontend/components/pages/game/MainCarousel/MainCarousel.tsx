import { useRef, useState } from "react";
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
}

export function MainCarousel({ isMain, isInfo }: MainCarouselProps) {
  const { classes, cx } = useMainCarouselStyles();

  const TRANSITION_DURATION = 200;
  const [embla, setEmbla] = useState<Embla | null>(null);
  useAnimationOffsetEffect(embla, TRANSITION_DURATION);

  const autoplay = useRef(emblaCarouselAutoplay({ delay: 4000 }));

  const [values] = useListState(GameSrcValues);

  const GameCarouselSlides = values.map((value) => (
    <Carousel.Slide>
      {isMain && (
        <BackgroundImage
          className={classes.backgroundImage}
          component="a"
          href={value.href}
          src={value.src}
          h={"100%"}
        >
          <Stack className={classes.gameIntro} spacing={"2rem"}>
            <Group>
              <Avatar radius={"md"} src={value.src} />
              <Text color="#fff" size={"1.8rem"}>
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
      previousControlIcon={<IconChevronLeft color="white" size={"3rem"}></IconChevronLeft>}
      nextControlIcon={<IconChevronRight color="white" size={"3rem"}></IconChevronRight>}
      getEmblaApi={setEmbla}
      plugins={[autoplay.current]}
      onMouseEnter={autoplay.current.stop}
      onMouseLeave={autoplay.current.reset}
    >
      {GameCarouselSlides}
    </Carousel>
  );
}
