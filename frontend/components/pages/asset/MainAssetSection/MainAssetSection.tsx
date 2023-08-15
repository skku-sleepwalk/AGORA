import { Box, Text } from "@mantine/core";
import { useMainAssetSectionStyles } from "./MainAssetSection.styles";
import { MainAsset } from "./MainAsset/MainAsset";
import { Carousel } from "@mantine/carousel";

export interface MainAssetSectionProps {
  title: string;
}

export function MainAssetSection({ title }: MainAssetSectionProps) {
  const { classes, cx } = useMainAssetSectionStyles();

  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const slides = data.map(() => {
    return (
      <Carousel.Slide>
        <MainAsset />
      </Carousel.Slide>
    );
  });

  return (
    <Box className={classes.container}>
      <Box className={classes.text}>
        <Text>{title}</Text>
      </Box>
      <Box className={classes.wrapper}>
        <Carousel
          className={classes.carousel}
          slideSize="16.66%"
          w={"100%"}
          height={"19rem"}
          align="start"
          slideGap="xl"
          slidesToScroll={3}
          controlsOffset="xs"
        >
          {slides}
        </Carousel>
      </Box>
    </Box>
  );
}
