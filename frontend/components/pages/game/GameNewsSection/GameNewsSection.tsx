import { Stack, Text } from "@mantine/core";
import { useGameNewsSectionStyles } from "./GameNewsSection.styles";
import { GameNews } from "./GameNews/GameNews";
import { useMediaQuery } from "@mantine/hooks";

export function GameNewsSection() {
  const smallScreen = useMediaQuery("(max-width: 765px)");
  const { classes, cx } = useGameNewsSectionStyles();

  return (
    <Stack spacing={"xl"}>
      <Text fz={smallScreen ? 28 : 32}>개발 일지</Text>
      {/* 후기 컨테이너 */}
      <GameNews />
      <GameNews />
      <GameNews />
    </Stack>
  );
}
