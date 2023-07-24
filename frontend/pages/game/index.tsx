import { Box, Divider, Group } from "@mantine/core";

import CardContainer from "../../components/common/CardContainer/CardContainer";
import MainLayout from "../../components/pages/game/MainLayout/MainLayout";
import { MainTab } from "../../components/pages/game/MainTab/MainTab";

import { Text } from "@mantine/core";
import { Image } from "@mantine/core";
import { CSSProperties } from "react";
import { Rightsection } from "../../components/pages/game/RightSection/RightSection";

import { MainCarousel } from "../../components/pages/game/MainCarousel/MainCarousel";
import { GameInfo } from "../../components/pages/game/GameInfo/GameInfo";
import GameLayout from "../../components/pages/game/GameLayout/GameLayout";
import { GameTab } from "../../components/pages/game/GameTab/GameTab";

function Game() {
  return (
    // <MainLayout tapSection={<MainTab />} upSection={<MainCarousel isMain={true} />}>
    //   <CardContainer w={"100%"} h={"50rem"}>
    //     main
    //   </CardContainer>
    // </MainLayout>

    <GameLayout
      photoSection={<MainCarousel isInfo={true} />}
      InfoSection={<GameInfo />}
      tapSection={<GameTab />}
      rightSection={<Rightsection />}
    >
      <CardContainer w={"100%"} h={"50rem"}>
        children
      </CardContainer>
    </GameLayout>
  );
}
export default Game;
