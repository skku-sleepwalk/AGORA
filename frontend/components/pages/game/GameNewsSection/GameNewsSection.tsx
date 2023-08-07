import { Collapse, Group, Stack, Text, useMantineTheme } from "@mantine/core";
import { useGameNewsSectionStyles } from "./GameNewsSection.styles";
import { GameNews } from "./GameNews/GameNews";
import { useMediaQuery, useSetState } from "@mantine/hooks";
import InvisibleButton from "../../../common/InvisibleButton/InvisibleButton";
import { IconPlus } from "@tabler/icons-react";
import { GameTabClicklContext } from "../../../../pages/game/[id]";
import { useContext } from "react";
import useGameBoardList from "../../../../hooks/useGameBoardList";

export interface GameNewsSectionProps {
  gameId: string;
}

export function GameNewsSection({ gameId }: GameNewsSectionProps) {
  const smallScreen = useMediaQuery("(max-width: 765px)");
  const { classes, cx } = useGameNewsSectionStyles();
  const theme = useMantineTheme();

  const [state, setState] = useSetState({ notice: false, update: false, develop: false });
  const handleScroll = useContext(GameTabClicklContext);
  const { data: noticeData } = useGameBoardList(["공지사항"], gameId);
  const { data: updateData } = useGameBoardList(["업데이트"], gameId);
  const { data: developData } = useGameBoardList(["개발일지"], gameId);

  return (
    <Stack spacing={"xl"} className={classes.all}>
      {/* 공지사항 */}
      <Stack spacing={"xl"} className={cx((state.update || state.develop) && classes.displayNone)}>
        <Group spacing={"sm"}>
          <Text fz={smallScreen ? 28 : 32}>공지사항</Text>
          <InvisibleButton
            className={classes.button}
            onClick={() => {
              setState({ notice: !state.notice });
              handleScroll.ontabClick();
            }}
          >
            <IconPlus className={cx(classes.Icon, state.notice && classes.rotate)} />
          </InvisibleButton>
        </Group>
        {noticeData?.map((data) => {
          return data.data.data.map((item) => {
            return <GameNews post={item} />;
          });
        })}
        <Collapse in={state.notice}>
          <Stack spacing={"xl"}>
            {/* <GameNews />
            <GameNews /> */}
          </Stack>
        </Collapse>
      </Stack>
      {/* 업데이트 */}
      <Stack
        spacing={"xl"}
        className={cx(
          (state.notice || state.develop) && classes.displayNone,
          !state.update && classes.marginTop
        )}
      >
        <Group spacing={"sm"}>
          <Text fz={smallScreen ? 28 : 32}>업데이트</Text>
          <InvisibleButton
            className={classes.button}
            onClick={() => {
              setState({ update: !state.update });
              handleScroll.ontabClick();
            }}
          >
            <IconPlus className={cx(classes.Icon, state.update && classes.rotate)} />
          </InvisibleButton>
        </Group>
        {updateData?.map((data) => {
          return data.data.data.map((item) => {
            return <GameNews post={item} />;
          });
        })}
        <Collapse in={state.update}>
          <Stack spacing={"xl"}>
            {/* <GameNews />
            <GameNews /> */}
          </Stack>
        </Collapse>
      </Stack>
      {/* 개발 일지 */}
      <Stack
        spacing={"xl"}
        className={cx(
          (state.notice || state.update) && classes.displayNone,
          !state.develop && classes.marginTop
        )}
      >
        <Group spacing={"sm"}>
          <Text fz={smallScreen ? 28 : 32}>개발 일지</Text>
          <InvisibleButton
            className={classes.button}
            onClick={() => {
              setState({ develop: !state.develop });
              handleScroll.ontabClick();
            }}
          >
            <IconPlus className={cx(classes.Icon, state.develop && classes.rotate)} />
          </InvisibleButton>
        </Group>
        {developData?.map((data) => {
          return data.data.data.map((item) => {
            return <GameNews post={item} />;
          });
        })}
        <Collapse in={state.develop}>
          <Stack spacing={"xl"}>
            {/* <GameNews />
            <GameNews /> */}
          </Stack>
        </Collapse>
      </Stack>
    </Stack>
  );
}
