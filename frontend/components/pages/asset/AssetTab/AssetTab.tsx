import { Tabs } from "@mantine/core";
import { useGameTabStyles } from "./AssetTab.styles";
import { Dispatch, SetStateAction, useContext } from "react";
import { useMediaQuery } from "@mantine/hooks";
import { AssetTabClickContext } from "../../../../pages/asset/[id]";

interface AssetTabProps {
  activeTab: string | null;
  setActiveTab?: Dispatch<SetStateAction<string | null>>;
}

export function AssetTab({ activeTab, setActiveTab }: AssetTabProps) {
  const { classes, cx } = useGameTabStyles();

  const smallScreen = useMediaQuery("(max-width: 780px)");
  const handleScroll = useContext(AssetTabClickContext);

  return (
    <Tabs value={activeTab} onTabChange={setActiveTab}>
      <Tabs.List className={classes.tabList} position="left">
        <Tabs.Tab
          value="info"
          className={cx(
            smallScreen ? classes.tabItem_S : classes.tabItem_B,
            activeTab === "info" && classes.tabItemActive
          )}
          onClick={handleScroll.ontabClickFast}
        >
          소개
        </Tabs.Tab>
        <Tabs.Tab
          value="review"
          className={cx(
            smallScreen ? classes.tabItem_S : classes.tabItem_B,
            activeTab === "review" && classes.tabItemActive
          )}
          onClick={handleScroll.ontabClickFast}
        >
          리뷰
        </Tabs.Tab>
      </Tabs.List>
    </Tabs>
  );
}
