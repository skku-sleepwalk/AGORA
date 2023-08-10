import BestStories from "../../components/pages/game/DevelopStories/BestStories";
import { DevelopStories } from "../../components/pages/game/DevelopStories/DevelopStories";
import Stories from "../../components/pages/game/DevelopStories/Stories";
export default function DevelopStory() {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <DevelopStories>
        <Stories></Stories>
      </DevelopStories>
      <DevelopStories>
        <BestStories></BestStories>
      </DevelopStories>
    </div>
  );
}
