import { Group } from "@mantine/core";
import CardContainer from "../../components/common/CardContainer/CardContainer";
import GameLayout from "../../components/pages/game/GameLayout/GameLayout";
import { MainCarousel } from "../../components/pages/game/MainCarousel/MainCarousel";
import MainLayout from "../../components/pages/game/MainLayout/MainLayout";
import { MainTab } from "../../components/pages/game/MainTab/MainTab";
import { Text } from "@mantine/core";
import { Image } from "@mantine/core";
import { CSSProperties } from "react";
function Game() {
  const margins: CSSProperties = {
    marginTop: 10,

    fontWeight: "bold",
  };
  const marginsgray: CSSProperties = {
    marginTop: 10,
    color: "gray",
    fontWeight: "bold",
  };
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
      rightSection={
        <CardContainer w={"100%"} h={"40rem"}>
          right
          <CardContainer w={"100%"} h={"7rem"}>
            <Group spacing={5}>
              <img
                style={{ marginTop: "0.5rem", position: "relative" }}
                src="/Ellipse15.png"
                alt="Ellipse 15"
              />
              <Text size={14} style={marginsgray}>
                146명의 사람들이 이 게임을 추천합니다!
              </Text>
            </Group>

            <Group spacing={5}>
              <img
                style={{ marginTop: "0.5rem", position: "relative" }}
                src="/Ellipse 16.png"
                alt="Ellipse 16"
              />
              <Text size={14} style={margins}>
                75명의 사람들이 이 게임을 플레이 중입니다.
              </Text>
            </Group>
          </CardContainer>
        </CardContainer>
      }
    >
      <CardContainer w={"100%"} h={"50rem"}>
        children
      </CardContainer>
    </GameLayout>
  );
}
export default Game;
