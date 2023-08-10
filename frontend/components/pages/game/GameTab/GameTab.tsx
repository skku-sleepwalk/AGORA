import { Tabs } from "@mantine/core";
import { useGameTabStyles } from "./GameTab.styles";
import { Dispatch, SetStateAction, useContext } from "react";
import { useMediaQuery } from "@mantine/hooks";
import { GameTabClickContext } from "../../../../pages/game/[id]";

interface GameTabProps {
  activeTab: string | null;
  setActiveTab?: Dispatch<SetStateAction<string | null>>;
}

export function GameTab({ activeTab, setActiveTab }: GameTabProps) {
  const { classes, cx } = useGameTabStyles();

  const smallScreen = useMediaQuery("(max-width: 780px)");
  const handleScroll = useContext(GameTabClickContext);

  return (
    <Tabs value={activeTab} onTabChange={setActiveTab}>
      <Tabs.List className={classes.tabList} position="left">
        <Tabs.Tab
          value="gameInfo"
          className={cx(
            smallScreen ? classes.tabItem_S : classes.tabItem_B,
            activeTab === "gameInfo" && classes.tabItemActive
          )}
          onClick={handleScroll.ontabClickFast}
        >
          게임 정보
        </Tabs.Tab>
        <Tabs.Tab
          value="gameNews"
          className={cx(
            smallScreen ? classes.tabItem_S : classes.tabItem_B,
            activeTab === "gameNews" && classes.tabItemActive
          )}
          onClick={handleScroll.ontabClickFast}
        >
          게임 소식
        </Tabs.Tab>
        <Tabs.Tab
          value="review"
          className={cx(
            smallScreen ? classes.tabItem_S : classes.tabItem_B,
            activeTab === "review" && classes.tabItemActive
          )}
          onClick={handleScroll.ontabClickFast}
        >
          후기
        </Tabs.Tab>
        <Tabs.Tab
          value="board"
          className={cx(
            smallScreen ? classes.tabItem_S : classes.tabItem_B,
            activeTab === "board" && classes.tabItemActive
          )}
          onClick={handleScroll.ontabClickFast}
        >
          게시판
        </Tabs.Tab>
      </Tabs.List>
    </Tabs>
  );
}
