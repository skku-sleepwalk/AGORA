import { Tabs } from "@mantine/core";
import { useGameTabStyles } from "./GameTab.styles";
import { Dispatch, SetStateAction } from "react";
import { useMediaQuery } from "@mantine/hooks";

interface GameTabProps {
  activeTab: string | null;
  setActiveTab?: Dispatch<SetStateAction<string | null>>;
}

export function GameTab({ activeTab, setActiveTab }: GameTabProps) {
  const { classes, cx } = useGameTabStyles();

  const smallScreen = useMediaQuery("(max-width: 780px)");

  return (
    <Tabs value={activeTab} onTabChange={setActiveTab}>
      <Tabs.List className={classes.tabList} position="left">
        <Tabs.Tab
          value="gameInfo"
          className={cx(
            smallScreen ? classes.tabItem_S : classes.tabItem_B,
            activeTab === "gameInfo" && classes.tabItemActive
          )}
        >
          게임 정보
        </Tabs.Tab>
        <Tabs.Tab
          value="gameNews"
          className={cx(
            smallScreen ? classes.tabItem_S : classes.tabItem_B,
            activeTab === "gameNews" && classes.tabItemActive
          )}
        >
          개발 과정
        </Tabs.Tab>
        <Tabs.Tab
          value="review"
          className={cx(
            smallScreen ? classes.tabItem_S : classes.tabItem_B,
            activeTab === "review" && classes.tabItemActive
          )}
        >
          후기
        </Tabs.Tab>
        <Tabs.Tab
          value="board"
          className={cx(
            smallScreen ? classes.tabItem_S : classes.tabItem_B,
            activeTab === "board" && classes.tabItemActive
          )}
        >
          게시판
        </Tabs.Tab>
      </Tabs.List>
    </Tabs>
  );
}
