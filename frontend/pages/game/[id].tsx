import { useRouter } from "next/router";
import { MainCarousel } from "../../components/pages/game/MainCarousel/MainCarousel";
import GameLayout from "../../components/pages/game/GameLayout/GameLayout";
import { GameSummary } from "../../components/pages/game/GameSummary/GameSummary";
import { GameTab } from "../../components/pages/game/GameTab/GameTab";
import { GameRightSide } from "../../components/pages/game/GameRightSide/GameRightSide";
import { GameReviewSection } from "../../components/pages/game/GameReviewSection/GameReviewSection";
import { createContext, useEffect, useRef, useState } from "react";
import { GameNewsSection } from "../../components/pages/game/GameNewsSection/GameNewsSection";
import { GameInfo } from "../../components/pages/game/GameInfo/GameInfo";
import { GameBoardSection } from "../../components/pages/game/GameBoardSection/GameBoardSection";
import useGame from "../../hooks/game/useGame";

// mutate 관련 context
export const GameContext = createContext({
  mutatePost: () => {},
});

export const GameTabClickContext = createContext({
  ontabClick: () => {},
  ontabClickFast: () => {},
});

function Game() {
  const router = useRouter();
  const gameId = router.query.id ? router.query.id.toString() : undefined;
  const board = router.query.board?.toString();

  const [activeTab, setActiveTab] = useState<string | null>("gameInfo");
  // tab 클릭 시 페이지 상단으로 이동 관련
  const tabRef = useRef<HTMLDivElement>(null);
  const ontabClick = () => {
    tabRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };
  const ontabClickFast = () => {
    tabRef.current?.scrollIntoView({ behavior: "instant", block: "nearest" });
  };

  const { data: postData, mutate: mutatePost } = useGame(gameId);

  useEffect(() => {
    if (board) {
      setActiveTab("board");
    }
  }, [board]);

  return (
    <GameContext.Provider value={{ mutatePost }}>
      <GameTabClickContext.Provider value={{ ontabClick, ontabClickFast }}>
        {postData && (
          <GameLayout
            photoSection={<MainCarousel isInfo={true} imgUrls={postData.data.store?.imgUrls} />}
            summarySection={<GameSummary postData={postData.data} />}
            anchorSection={<div ref={tabRef}></div>}
            tabSection={<GameTab activeTab={activeTab} setActiveTab={setActiveTab} />}
            rightSection={<GameRightSide postData={postData.data} />}
          >
            {activeTab === "gameInfo" && <GameInfo postData={postData.data} />}
            {activeTab === "gameNews" && gameId && <GameNewsSection gameId={gameId} />}
            {activeTab === "review" && gameId && <GameReviewSection gameId={gameId} />}
            {/* {activeTab === "board" && <GameBoardDetailViewer />} */}
            {activeTab === "board" && postData && (
              <GameBoardSection
                gameName={postData.data.store.title}
                developerName={postData.data.store.developer}
                developerId={postData.data.author.id}
                gameId={postData.data.id}
              />
            )}
          </GameLayout>
        )}
      </GameTabClickContext.Provider>
    </GameContext.Provider>
  );
}
export default Game;
