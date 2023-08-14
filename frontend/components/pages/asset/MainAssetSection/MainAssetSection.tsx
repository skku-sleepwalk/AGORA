import { Box, Text } from "@mantine/core";
import { useMainAssetSectionStyles } from "./MainAssetSection.styles";
import { MainAsset } from "./MainAsset/MainAsset";

export interface MainAssetSectionProps {
  title: string;
}

export function MainAssetSection({ title }: MainAssetSectionProps) {
  const { classes, cx } = useMainAssetSectionStyles();

  return (
    <Box className={classes.container}>
      <Box className={classes.text}>
        <Text>{title}</Text>
      </Box>
      <Box className={classes.wrapper}>
        <MainAsset />
        <MainAsset />
        <MainAsset />
        <MainAsset />
        <MainAsset />
        <MainAsset />
      </Box>
    </Box>
  );
}
