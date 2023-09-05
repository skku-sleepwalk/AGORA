import { useRef, useState } from "react";
import { Avatar, BackgroundImage, Image, Group, Stack, Text, Container } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { Carousel, Embla, useAnimationOffsetEffect } from "@mantine/carousel";
import emblaCarouselAutoplay from "embla-carousel-autoplay";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { useMainCarouselStyles } from "./MainCarousel.styles";
import { GetGameListResponse } from "../../../../types/api/game/game";

interface MainCarouselProps {
  type: "main" | "info";
  data?: GetGameListResponse[] | undefined;
  imgUrls?: string[] | undefined;
}

export function MainCarousel({ type, imgUrls, data }: MainCarouselProps) {
  const { classes, cx } = useMainCarouselStyles();

  const TRANSITION_DURATION = 200;
  const [embla, setEmbla] = useState<Embla | null>(null);
  useAnimationOffsetEffect(embla, TRANSITION_DURATION);
  const autoplay = useRef(emblaCarouselAutoplay({ delay: 4000 }));

  const lgScreen = useMediaQuery("(max-width: 820px)");
  const smScreen = useMediaQuery("(max-width: 540px)");

  const GameCarouselSlides =
    (type === "main" && data === undefined) || (type === "info" && imgUrls === undefined) ? (
      <Carousel.Slide>
        <Image src={"/images/nonImageRectangle.svg"} fit="fill" />
      </Carousel.Slide>
    ) : type === "main" ? (
      data?.map((value) => {
        return value.data.data.map((data) => (
          <Carousel.Slide>
            <BackgroundImage
              className={classes.backgroundImage}
              component="a"
              href={`/game/${data.id}`}
              src={data.store.imgUrls[0]}
              h={"100%"}
            >
              <Stack className={classes.gameIntro}>
                <Group>
                  <Avatar
                    className={classes.gameAvatar}
                    radius={"20%"}
                    src={"images/gameIcon.svg"}
                  />
                  <Text className={classes.gameName} color="#fff">
                    {data.title}
                  </Text>
                </Group>
                <Text className={classes.gameExplain} lineClamp={2}>
                  {data.title}을 Agora 베타테스트에서 즐겨보세요!!
                </Text>
              </Stack>
            </BackgroundImage>
          </Carousel.Slide>
        ));
      })
    ) : (
      imgUrls?.map((url) => (
        <Carousel.Slide>
          <Container className={classes.imageContainer}>
            <Image
              className={classes.image}
              width={"100%"}
              height={"100%"}
              radius={"lg"}
              fit="contain"
              src={url}
            />
          </Container>
        </Carousel.Slide>
      ))
    );

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
