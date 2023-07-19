import { Center, Tabs } from "@mantine/core";
import { useMainTabStyles } from "./MainTab.styles";
import { useState } from "react";

export function MainTab() {
  const { classes, cx } = useMainTabStyles();
  const [activeTab, setActiveTab] = useState<string | null>("main");

  return (
    <Tabs value={activeTab} onTabChange={setActiveTab} className={classes.container}>
      <Tabs.List className={classes.tabList} position="center">
        <Tabs.Tab
          value="main"
          className={cx(classes.tabItem, activeTab === "main" && classes.tabItemActive)}
        >
          메인
        </Tabs.Tab>
        <Tabs.Tab
          value="develop"
          className={cx(classes.tabItem, activeTab === "develop" && classes.tabItemActive)}
        >
          개발 과정
        </Tabs.Tab>
        <Tabs.Tab
          value="allGame"
          className={cx(classes.tabItem, activeTab === "allGame" && classes.tabItemActive)}
        >
          전체 게임
        </Tabs.Tab>
      </Tabs.List>
    </Tabs>
  );
}
