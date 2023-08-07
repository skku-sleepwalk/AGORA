import { Box, RingProgress, Stack, Text } from "@mantine/core";
import useAuth from "../../../../hooks/useAuth";
import CardContainer from "../../../common/CardContainer/CardContainer";
import { useMypagePlaytimesSectionStyles } from "./mypagePlaytimesSection.styles";
import { useUserPlaytimes } from "../../../../hooks/useUserPlaytimes";

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

export function MypagePlaytimesSection() {
  const { classes, cx } = useMypagePlaytimesSectionStyles();
  const { user, token } = useAuth();

  const { data: me } = useUserPlaytimes();

  return (
    <CardContainer bg={"white"} w={"100%"}>
      <div className={classes.container}>
        <Stack spacing={0}>
          <Text className={classes.totalPlaytimeText} size="xl">
            총 게임 시간
          </Text>
          <RingProgress
            size={300}
            thickness={30}
            label={
              <Text size="xl" align="center">
                {me !== undefined ? SwitchPlaytime(me.data.totalPlaytime) : null}
              </Text>
            }
            sections={[
              { value: 40, color: "cyan" },
              { value: 15, color: "orange" },
              { value: 15, color: "grape" },
            ]}
          />
        </Stack>
        <Stack></Stack>
      </div>
    </CardContainer>
  );
}
