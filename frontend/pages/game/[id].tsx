import { useRouter } from "next/router";
import { MainCarousel } from "../../components/pages/game/MainCarousel/MainCarousel";
import GameLayout from "../../components/pages/game/GameLayout/GameLayout";
import { GameSummary } from "../../components/pages/game/GameSummary/GameSummary";
import { GameTab } from "../../components/pages/game/GameTab/GameTab";
import { GameRightSide } from "../../components/pages/game/GameRightSide/GameRightSide";
import { GameReviewSection } from "../../components/pages/game/GameReviewSection/GameReviewSection";
import { createContext, useRef, useState } from "react";
import { GameNewsSection } from "../../components/pages/game/GameNewsSection/GameNewsSection";
import { GameInfo } from "../../components/pages/game/GameInfo/GameInfo";
import { GameBoardSection } from "../../components/pages/game/GameBoardSection/GameBoardSection";

import useDetailGame from "../../hooks/useDetailGame";

import { GameBoardDetailViewer } from "../../components/pages/game/GameBoardSection/GameBoardDetailViewer/GameBoardDetailViewer";

export const TabClicklContext = createContext({
  ontabClick: () => {},
  ontabClickFast: () => {},
});

function Game() {
  const router = useRouter();
  const id = router.query.id ? router.query.id.toString() : undefined;
  const [activeTab, setActiveTab] = useState<string | null>("gameInfo");
  // tab 클릭 시 페이지 상단으로 이동 관련
  const tabRef = useRef<HTMLDivElement>(null);
  const ontabClick = () => {
    tabRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };
  const ontabClickFast = () => {
    tabRef.current?.scrollIntoView({ behavior: "instant", block: "nearest" });
  };
  // const id = "6a05a155-147b-4112-a95f-88e53edec2aa";
  // 추후 수정
  // router.query.name
  const {
    data: postData,
    isLoading: isPostLoading,

    mutate: mutatePost,
  } = useDetailGame(id);
  return (
    // <MainLayout tapSection={<MainTab />} upSection={<MainCarousel isMain={true} />}>
    //   <SmallPosts></SmallPosts>
    // </MainLayout>
    <TabClicklContext.Provider value={{ ontabClick, ontabClickFast }}>
      <GameLayout
        photoSection={<MainCarousel isInfo={true} />}
        summarySection={
          <GameSummary postData={postData} loading={isPostLoading} mutate={mutatePost} />
        }
        anchorSection={<div ref={tabRef}></div>}
        tabSection={<GameTab activeTab={activeTab} setActiveTab={setActiveTab} />}
        rightSection={
          <GameRightSide postData={postData} loading={isPostLoading} mutate={mutatePost} />
        }
      >
        {activeTab === "gameInfo" && <GameInfo />}
        {activeTab === "gameNews" && <GameNewsSection />}
        {activeTab === "review" && <GameReviewSection />}
        {activeTab === "board" && <GameBoardDetailViewer />}
        {/* {activeTab === "board" && <GameBoardSection />} */}
      </GameLayout>
    </TabClicklContext.Provider>
  );
}
export default Game;
