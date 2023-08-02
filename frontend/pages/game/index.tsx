import CardContainer from "../../components/common/CardContainer/CardContainer";
import MainLayout from "../../components/pages/game/MainLayout/MainLayout";
import { MainCarousel } from "../../components/pages/game/MainCarousel/MainCarousel";
import { MainTab } from "../../components/pages/game/MainTab/MainTab";
import { SmallPosts } from "../../components/pages/game/SmallPost/SmallPosts";
import GameLayout from "../../components/pages/game/GameLayout/GameLayout";
import { GameSummary } from "../../components/pages/game/GameSummary/GameSummary";
import { GameTab } from "../../components/pages/game/GameTab/GameTab";
import { Rightsection } from "../../components/pages/game/RightSection/RightSection";
import { GameReviewSection } from "../../components/pages/game/GameReviewSection/GameReviewSection";
import { createContext, useRef, useState } from "react";
import { GameNewsSection } from "../../components/pages/game/GameNewsSection/GameNewsSection";
import { GameInfo } from "../../components/pages/game/GameInfo/GameInfo";
import { GameBoardSection } from "../../components/pages/game/GameBoardSection/GameBoardSection";
import useDetailGame from "../../hooks/useDetailGame";
export const TabClicklContext = createContext({
  ontabClick: () => {},
  ontabClickFast: () => {},
});

function Game() {
  const [activeTab, setActiveTab] = useState<string | null>("gameInfo");
  // tab 클릭 시 페이지 상단으로 이동 관련
  const tabRef = useRef<HTMLDivElement>(null);
  const ontabClick = () => {
    tabRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };
  const ontabClickFast = () => {
    tabRef.current?.scrollIntoView({ behavior: "instant", block: "nearest" });
  };
  const id = "9fb651e5-e69d-4cfd-8a29-f753129aadc1";
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
        summarySection={<GameSummary />}
        anchorSection={<div ref={tabRef}></div>}
        tabSection={<GameTab activeTab={activeTab} setActiveTab={setActiveTab} />}
        rightSection={<Rightsection />}
      >
        {activeTab === "gameInfo" && <GameInfo />}
        {activeTab === "gameNews" && <GameNewsSection />}
        {activeTab === "review" && <GameReviewSection />}
        {activeTab === "board" && <GameBoardSection />}
      </GameLayout>
    </TabClicklContext.Provider>
  );
}
export default Game;
