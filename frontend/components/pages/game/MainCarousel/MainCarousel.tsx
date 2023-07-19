import { useRef, useState } from "react";
import { Avatar, BackgroundImage, Box, Container, Group, Stack, Text } from "@mantine/core";
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

export function MainCarousel() {
  const { classes, cx } = useMainCarouselStyles();

  const TRANSITION_DURATION = 200;
  const [embla, setEmbla] = useState<Embla | null>(null);
  useAnimationOffsetEffect(embla, TRANSITION_DURATION);

  const autoplay = useRef(emblaCarouselAutoplay({ delay: 4000 }));

  const [values] = useListState(GameSrcValues);

  const GameCarouselSlides = values.map((value) => (
    <Carousel.Slide>
      <BackgroundImage
        className={classes.backgroundImage}
        w={"100%"}
        h={"100%"}
        component="a"
        href={value.href}
        src={value.src}
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
    </Carousel.Slide>
  ));

  return (
    <Carousel
      className={classes.carousel}
      slideSize="100%"
      height="30rem"
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
