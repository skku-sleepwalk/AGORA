import { Avatar, Box, Group, List, Text, useMantineTheme } from "@mantine/core";
import { useMypagePlaytimeBarStyles } from "./mypagePlaytimeBar.styles";
import { PlaytimeColor, SwitchPlaytime } from "../mypagePlaytimesSection";
import { useUserPlaytimes } from "../../../../../hooks/game/useUserPlaytimes";

export function MypagePlaytimeBar() {
  const { classes, cx } = useMypagePlaytimeBarStyles();
  const theme = useMantineTheme();
  const playtimeColor = PlaytimeColor();

  const { data: me } = useUserPlaytimes();

  const listItem = me?.data.playtimes.map((item, index) => {
    return (
      <List.Item
        className={classes.listItem}
        icon={
          <Box
            className={classes.line}
            bg={index <= 8 ? playtimeColor[index] : playtimeColor[9]}
          ></Box>
        }
      >
        <Group className={classes.group} position="apart">
          <Group>
            <Avatar
              size={"2.5rem"}
              radius={"20%"}
              src={
                "https://play-lh.googleusercontent.com/He92papZcOmkgTi1sLHXQQb02aoyRtJ8ml96njM_cSAcpHhILvxMjhLix4mYEIKXPq4=s96-rw"
              }
            />
            <Text fz={"lg"}>{item.game.title}</Text>
          </Group>
          <Text fz={"lg"}>{SwitchPlaytime(item.playtime)}</Text>
        </Group>
      </List.Item>
    );
  });

  return (
    <List spacing="sm" size="sm" center>
      {listItem}
    </List>
  );
}
