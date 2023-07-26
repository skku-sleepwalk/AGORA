import MainLayout from "../../components/pages/game/MainLayout/MainLayout";
import { SmallPosts } from "../../components/pages/game/SmallPost/SmallPosts";
import { MainTab } from "../../components/pages/game/MainTab/MainTab";
import { MainCarousel } from "../../components/pages/game/MainCarousel/MainCarousel";
export default function Main() {
  return (
    <MainLayout tapSection={<MainTab />} upSection={<MainCarousel isMain={true} />}>
      <SmallPosts></SmallPosts>
    </MainLayout>
  );
}
