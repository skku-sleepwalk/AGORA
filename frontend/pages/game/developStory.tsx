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

      <DevelopStories TitleProp="임시용 개발일지 몰아보기">
        <Stories gameID={"6a05a155-147b-4112-a95f-88e53edec2aa"}></Stories>
      </DevelopStories>
      <DevelopStories TitleProp="Best of Develop Stories">
        <BestStories></BestStories>
      </DevelopStories>
    </div>
  );
}
