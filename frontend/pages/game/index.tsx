import { Box, Divider, Group } from "@mantine/core";
import CardContainer from "../../components/common/CardContainer/CardContainer";
import GameLayout from "../../components/pages/game/GameLayout/GameLayout";
import { MainCarousel } from "../../components/pages/game/MainCarousel/MainCarousel";
import MainLayout from "../../components/pages/game/MainLayout/MainLayout";
import { MainTab } from "../../components/pages/game/MainTab/MainTab";
import { Text } from "@mantine/core";
import { Image } from "@mantine/core";
import { CSSProperties } from "react";
import { Rightsection } from "../../components/pages/game/RightSection/RightSection";
function Game() {
  return (
    // <MainLayout tapSection={<MainTab />} upSection={<MainCarousel />}>
    //   <CardContainer w={"100%"} h={"50rem"}>
    //     main
    //   </CardContainer>
    // </MainLayout>
    <GameLayout
      photoSection={
        <CardContainer w={"100%"} h={"100%"}>
          photo
        </CardContainer>
      }
      summarySection={
        <CardContainer w={"100%"} h={"100%"}>
          summary
        </CardContainer>
      }
      tapSection={
        <CardContainer w={"100%"} h={"100%"}>
          tap
        </CardContainer>
      }
      rightSection={<Rightsection />}
    >
      <CardContainer w={"100%"} h={"50rem"}>
        children
      </CardContainer>
    </GameLayout>
  );
}
export default Game;
