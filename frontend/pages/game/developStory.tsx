import BestStories from "../../components/pages/game/DevelopStories/BestStories";
import { DevelopStories } from "../../components/pages/game/DevelopStories/DevelopStories";
import Stories from "../../components/pages/game/DevelopStories/Stories";
import { MainTab } from "../../components/pages/game/MainTab/MainTab";
export default function DevelopStory() {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ position: "sticky", top: "70px", zIndex: "1000" }}>
        <MainTab active="develop"></MainTab>
      </div>

      <DevelopStories>
        <Stories></Stories>
      </DevelopStories>
      <DevelopStories>
        <BestStories></BestStories>
      </DevelopStories>
    </div>
  );
}
