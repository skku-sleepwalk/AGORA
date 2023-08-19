import { Box, Text } from "@mantine/core";
import { useMainAssetSectionStyles } from "./MainAssetSection.styles";
import { Carousel } from "@mantine/carousel";

export interface MainAssetSectionProps {
  title: string;
  children: React.ReactNode;
}

export function MainAssetSection({ title, children }: MainAssetSectionProps) {
  const { classes, cx } = useMainAssetSectionStyles();

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
          {children}
        </Carousel>
      </Box>
    </Box>
  );
}
