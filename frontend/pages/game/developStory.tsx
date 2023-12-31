import Link from "next/link";
import BestStories from "../../components/pages/game/DevelopStories/BestStories";
import { DevelopStories } from "../../components/pages/game/DevelopStories/DevelopStories";
import Stories from "../../components/pages/game/DevelopStories/Stories";
import { MainTab } from "../../components/pages/game/MainTab/MainTab";
import MainLayout from "../../components/pages/game/MainLayout/MainLayout";
import { MainCarousel } from "../../components/pages/game/MainCarousel/MainCarousel";

export default function DevelopStory() {
  const GameID = "6a05a155-147b-4112-a95f-88e53edec2aa";
  return (
    <MainLayout tapSection={<MainTab active="develop" />}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <DevelopStories TitleProp="임시용 개발일지 몰아보기">
          {/* <Link
          href={GameID}
          style={{
            textDecoration: "none",
            color: "black",
            display: "flex",
            justifyContent: "center",
          }}
        > */}
          <Stories gameID={GameID}></Stories>
          {/* </Link> */}
        </DevelopStories>
        <DevelopStories TitleProp="Best of Develop Stories">
          <BestStories></BestStories>
        </DevelopStories>
      </div>
    </MainLayout>
  );
}
