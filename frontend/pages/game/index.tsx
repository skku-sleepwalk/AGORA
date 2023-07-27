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
import { useState } from "react";
import { GameNewsSection } from "../../components/pages/game/GameNewsSection/GameNewsSection";

function Game() {
  const [activeTab, setActiveTab] = useState<string | null>("gameInfo");

  return (
    // <MainLayout tapSection={<MainTab />} upSection={<MainCarousel isMain={true} />}>
    //   <SmallPosts></SmallPosts>
    // </MainLayout>

    <GameLayout
      photoSection={<MainCarousel isInfo={true} />}
      summarySection={<GameSummary />}
      tapSection={<GameTab activeTab={activeTab} setActiveTab={setActiveTab} />}
      rightSection={<Rightsection />}
    >
      {activeTab === "gameInfo" && (
        <CardContainer w={"100%"} h={"50rem"}>
          gameInfo
        </CardContainer>
      )}
      {activeTab === "gameNews" && <GameNewsSection />}
      {activeTab === "review" && <GameReviewSection />}
      {activeTab === "board" && (
        <CardContainer w={"100%"} h={"50rem"}>
          board
        </CardContainer>
      )}
    </GameLayout>
  );
}
export default Game;
