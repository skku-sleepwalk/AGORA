import { useMediaQuery } from "@mantine/hooks";
import { useMypageTabStyles } from "./mypageTab.styles";
import { Tabs } from "@mantine/core";
import { Dispatch, SetStateAction, useContext } from "react";
import { MypageTabClicklContext } from "../../../../pages/mypage";

interface GameTabProps {
  activeTab: string | null;
  setActiveTab?: Dispatch<SetStateAction<string | null>>;
}

export function MypageTab({ activeTab, setActiveTab }: GameTabProps) {
  const { classes, cx } = useMypageTabStyles();

  const smallScreen = useMediaQuery("(max-width: 780px)");
  const handleScroll = useContext(MypageTabClicklContext);

  return (
    <Tabs value={activeTab} onTabChange={setActiveTab}>
      <Tabs.List className={classes.tabList} position="left">
        <Tabs.Tab
          value="playtimes"
          className={cx(
            smallScreen ? classes.tabItem_S : classes.tabItem_B,
            activeTab === "playtimes" && classes.tabItemActive
          )}
          onClick={handleScroll.ontabClickFast}
        >
          플레이한 게임
        </Tabs.Tab>
        <Tabs.Tab
          value="myPosts"
          className={cx(
            smallScreen ? classes.tabItem_S : classes.tabItem_B,
            activeTab === "myPosts" && classes.tabItemActive
          )}
          onClick={handleScroll.ontabClickFast}
        >
          내가 올린 글
        </Tabs.Tab>
      </Tabs.List>
    </Tabs>
  );
}
