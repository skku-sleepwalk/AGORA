import CardContainer from "../../components/common/CardContainer/CardContainer";
import { MainCarousel } from "../../components/pages/game/MainCarousel/MainCarousel";
import MainLayout from "../../components/pages/game/MainLayout/MainLayout";
import { MainTab } from "../../components/pages/game/MainTab/MainTab";

function Game() {
  return (
    <MainLayout tapSection={<MainTab />} upSection={<MainCarousel />}>
      <CardContainer w={"100%"} h={"40rem"}>
        main
      </CardContainer>
    </MainLayout>
  );
}
export default Game;
