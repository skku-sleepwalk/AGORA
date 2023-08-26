import { Box, Center, Loader, Text } from "@mantine/core";
import { useMainAssetSectionStyles } from "./MainAssetSection.styles";
import { Carousel } from "@mantine/carousel";
import { GetAssetListResponse } from "../../../../types/api/asset";
import { MainAsset } from "./MainAsset/MainAsset";

export interface MainAssetSectionProps {
  onSlideChange: (index: number) => void;
  assetData: GetAssetListResponse[] | undefined;
  isAssetLoading: boolean;
  title: string;
}

export function MainAssetSection({
  onSlideChange,
  assetData,
  isAssetLoading,
  title,
}: MainAssetSectionProps) {
  const { classes, cx } = useMainAssetSectionStyles();

  const slides = assetData?.map((data) => {
    return data.data.data.map((data) => (
      <Carousel.Slide>
        <MainAsset assetData={data} />
      </Carousel.Slide>
    ));
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
          controlsOffset="xs"
          onSlideChange={onSlideChange}
        >
          {slides}
          {isAssetLoading && (
            <Center w={"10rem"} h={"16.9rem"}>
              <Loader color="teal" variant="dots" />
            </Center>
          )}
        </Carousel>
      </Box>
    </Box>
  );
}
