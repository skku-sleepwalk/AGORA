import { Box, Button, Tabs } from "@mantine/core";
import { useMainTabStyles } from "./MainTab.styles";
import { useState } from "react";
import { useMediaQuery } from "@mantine/hooks";
import { useRouter } from "next/router";

export interface MainTabProps {
  active: string;
}
export function MainTab({ active }: MainTabProps) {
  const { classes, cx } = useMainTabStyles();
  const [activeTab, setActiveTab] = useState<string | null>(active);
  const router = useRouter();

  const smallScreen = useMediaQuery("(max-width: 780px)");

  return (
    <Tabs value={activeTab} onTabChange={setActiveTab}>
      <Tabs.List className={classes.tabList} position="center">
        <Tabs.Tab
          value="main"
          className={cx(classes.tabItem, activeTab === "main" && classes.tabItemActive)}
          onClick={() => router.replace("/game")}
        >
          메인
        </Tabs.Tab>
        {/* <Tabs.Tab
          value="develop"
          className={cx(classes.tabItem, activeTab === "develop" && classes.tabItemActive)}
          onClick={() => router.replace("/game/developStory")}
        >
          개발 과정
        </Tabs.Tab> */}
        <Tabs.Tab
          value="allGame"
          className={cx(classes.tabItem, activeTab === "allGame" && classes.tabItemActive)}
          onClick={() => router.replace("/game/allGame")}
        >
          전체 게임
        </Tabs.Tab>
        {/* <Button
          className={cx(smallScreen ? classes.button_S : classes.button_B)}
          variant="outline"
          radius="lg"
        >
          게임 출시
        </Button> */}
      </Tabs.List>
    </Tabs>
  );
}
