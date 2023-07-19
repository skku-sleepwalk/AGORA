import CardContainer from "../../components/common/CardContainer/CardContainer";
import { MainCarousel } from "../../components/pages/game/MainCarousel/MainCarousel";
import MainLayout from "../../components/pages/game/MainLayout/MainLayout";

function Game() {
  return (
    <MainCarousel />
    // <MainLayout
    //   tapSection={
    //     <CardContainer w={"100%"} h={"100%"}>
    //       tap
    //     </CardContainer>
    //   }
    //   upSection={<MainCarousel />}
    // >
    //   <CardContainer w={"100%"} h={"100%"}>
    //     main
    //   </CardContainer>
    // </MainLayout>
  );
}
export default Game;
