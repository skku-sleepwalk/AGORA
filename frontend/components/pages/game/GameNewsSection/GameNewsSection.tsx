import { Collapse, Group, Stack, Text, useMantineTheme } from "@mantine/core";
import { useGameNewsSectionStyles } from "./GameNewsSection.styles";
import { GameNews } from "./GameNews/GameNews";
import { useMediaQuery, useSetState } from "@mantine/hooks";
import InvisibleButton from "../../../common/InvisibleButton/InvisibleButton";
import { IconPlus } from "@tabler/icons-react";

export function GameNewsSection() {
  const smallScreen = useMediaQuery("(max-width: 765px)");
  const { classes, cx } = useGameNewsSectionStyles();
  const theme = useMantineTheme();

  const [state, setState] = useSetState({ notice: false, update: false, develop: false });

  return (
    <Stack spacing={"xl"}>
      {/* 공지사항 */}
      <Group spacing={"sm"}>
        <Text fz={smallScreen ? 28 : 32}>공지사항</Text>
        <InvisibleButton
          className={classes.button}
          onClick={() => setState({ notice: !state.notice })}
        >
          <IconPlus className={cx(classes.Icon, state.notice && classes.rotate)} />
        </InvisibleButton>
      </Group>
      <GameNews />
      <GameNews />
      <Collapse in={state.notice}>
        <Stack spacing={"xl"}>
          <GameNews />
          <GameNews />
        </Stack>
      </Collapse>
      {/* 업데이트 */}
      <Group className={classes.group} spacing={"sm"}>
        <Text fz={smallScreen ? 28 : 32}>업데이트</Text>
        <InvisibleButton
          className={classes.button}
          onClick={() => setState({ update: !state.update })}
        >
          <IconPlus className={cx(classes.Icon, state.update && classes.rotate)} />
        </InvisibleButton>
      </Group>
      <GameNews />
      <GameNews />
      <Collapse in={state.update}>
        <Stack spacing={"xl"}>
          <GameNews />
          <GameNews />
        </Stack>
      </Collapse>
      {/* 개발 일지 */}
      <Group className={classes.group} spacing={"sm"}>
        <Text fz={smallScreen ? 28 : 32}>개발 일지</Text>
        <InvisibleButton
          className={classes.button}
          onClick={() => setState({ develop: !state.develop })}
        >
          <IconPlus className={cx(classes.Icon, state.develop && classes.rotate)} />
        </InvisibleButton>
      </Group>
      <GameNews />
      <GameNews />
      <GameNews />
      <Collapse in={state.develop}>
        <Stack spacing={"xl"}>
          <GameNews />
          <GameNews />
        </Stack>
      </Collapse>
    </Stack>
  );
}
