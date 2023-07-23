import { Tabs } from "@mantine/core";
import { useGameTabStyles } from "./GameTab.styles";
import { useState } from "react";
import { useMediaQuery } from "@mantine/hooks";

export function GameTab() {
  const { classes, cx } = useGameTabStyles();
  const [activeTab, setActiveTab] = useState<string | null>("gameInfo");

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
          value="develop"
          className={cx(
            smallScreen ? classes.tabItem_S : classes.tabItem_B,
            activeTab === "develop" && classes.tabItemActive
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
