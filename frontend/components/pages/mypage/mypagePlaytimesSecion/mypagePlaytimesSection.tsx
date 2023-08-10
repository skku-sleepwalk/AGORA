import { Box, RingProgress, Stack, Text, useMantineTheme } from "@mantine/core";
import useAuth from "../../../../hooks/useAuth";
import CardContainer from "../../../common/CardContainer/CardContainer";
import { useMypagePlaytimesSectionStyles } from "./mypagePlaytimesSection.styles";
import { useUserPlaytimes } from "../../../../hooks/game/useUserPlaytimes";
import { MypagePlaytimeBar } from "./mypagePlaytimeBar/mypagePlaytimeBar";

export function SwitchPlaytime(playtime: number): string {
  const hours = Math.floor(playtime / 60);
  const minutes = playtime % 60;

  if (hours === 0) {
    return `${minutes}분`;
  } else if (minutes === 0) {
    return `${hours}시간`;
  } else {
    return `${hours}시간 ${minutes}분`;
  }
}

export function PlaytimeColor(): string[] {
  const theme = useMantineTheme();

  return [
    theme.colors.cyan[6],
    theme.colors.orange[6],
    theme.colors.grape[6],
    theme.colors.lime[6],
    theme.colors.teal[6],
    theme.colors.pink[6],
    theme.colors.indigo[6],
    theme.colors.yellow[6],
    theme.colors.red[6],
    theme.colors.gray[4],
  ];
}

export function MypagePlaytimesSection() {
  const { classes, cx } = useMypagePlaytimesSectionStyles();
  const theme = useMantineTheme();
  const playtimeColor = PlaytimeColor();

  const { user, token } = useAuth();
  const { data: me } = useUserPlaytimes();

  const sections = me?.data.playtimes.map((item, index) => {
    const percent = (item.playtime / me.data.totalPlaytime) * 100;
    const color = index <= 8 ? playtimeColor[index] : playtimeColor[9];
    const tooltip = item.game.title;

    return index <= 8
      ? { value: percent, color: color, tooltip: tooltip }
      : { value: percent, color: color };
  });

  console.log(sections);

  return (
    <CardContainer bg={"white"} w={"100%"}>
      <Stack className={classes.stack} spacing={0}>
        <Text className={classes.totalPlaytimeText} fz={"1.6rem"}>
          총 게임 시간
        </Text>
        <div className={classes.container}>
          {sections && (
            <RingProgress
              size={370}
              thickness={40}
              label={
                <Text size="xl" align="center">
                  {me !== undefined ? SwitchPlaytime(me.data.totalPlaytime) : null}
                </Text>
              }
              sections={sections}
            />
          )}
          {!sections && (
            <RingProgress
              className={classes.ringProcess}
              size={370}
              thickness={40}
              label={
                <Text size="xl" align="center">
                  플레이 기록 없음
                </Text>
              }
              sections={[{ value: 100, color: theme.colors.gray[2] }]}
            />
          )}
          <Box className={classes.playtimeBar}>
            <MypagePlaytimeBar />
          </Box>
        </div>
      </Stack>
    </CardContainer>
  );
}
