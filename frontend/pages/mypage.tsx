import { createContext, useRef, useState } from "react";
import { MypageTab } from "../components/pages/mypage/mypageTab/mypageTab";
import { MypageUserInfo } from "../components/pages/mypage/mypageUserInfo/mypageUserInfo";
import { Box } from "@mantine/core";
import MypageLayout from "../components/pages/mypage/mypageLayout/mypageLayout";
import { MypagePlaytimesSection } from "../components/pages/mypage/mypagePlaytimesSecion/mypagePlaytimesSection";

export const MypageTabClicklContext = createContext({
  ontabClick: () => {},
  ontabClickFast: () => {},
});

function Main() {
  const [activeTab, setActiveTab] = useState<string | null>("playtimes");

  // tab 클릭 시 페이지 상단으로 이동 관련
  const tabRef = useRef<HTMLDivElement>(null);
  const ontabClick = () => {
    tabRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };
  const ontabClickFast = () => {
    tabRef.current?.scrollIntoView({ behavior: "instant", block: "nearest" });
  };

  return (
    <MypageTabClicklContext.Provider value={{ ontabClick, ontabClickFast }}>
      <MypageLayout
        userInfoSection={<MypageUserInfo />}
        anchorSection={<div ref={tabRef}></div>}
        tabSection={<MypageTab activeTab={activeTab} setActiveTab={setActiveTab} />}
      >
        {activeTab === "playtimes" && <MypagePlaytimesSection />}
        {activeTab === "myPosts" && <Box h={"40rem"}></Box>}
      </MypageLayout>
    </MypageTabClicklContext.Provider>
  );
}

export default Main;
