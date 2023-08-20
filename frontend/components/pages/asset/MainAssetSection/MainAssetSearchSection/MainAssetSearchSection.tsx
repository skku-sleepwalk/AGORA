import { Box, Group, Text, useMantineTheme } from "@mantine/core";
import { useMainAssetSearchSectionStyles } from "./MainAssetSearchSection.styles";

export interface MainAssetSearchSectionProps {
  searchKeyword: string;
  children: React.ReactNode;
}

export function MainAssetSearchSection({ searchKeyword, children }: MainAssetSearchSectionProps) {
  const { classes, cx } = useMainAssetSearchSectionStyles();
  const theme = useMantineTheme();

  return (
    <Box className={classes.container}>
      <Box className={classes.text}>
        <Group spacing={"xs"}>
          <Text>'{searchKeyword}'</Text>
          <Text fz={"1rem"} c={theme.colors.gray[6]}>
            의 검색결과
          </Text>
        </Group>
      </Box>
      <Box className={classes.wrapper}>{children}</Box>
    </Box>
  );
}
