import CardContainer from "../../../common/CardContainer/CardContainer";
import { Carousel } from "@mantine/carousel";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import useAuth from "../../../../hooks/useAuth";
import { Image } from "@mantine/core";
import { Text } from "@mantine/core";
import Story from "./story";
import useGameBoardList from "../../../../hooks/game/useGameBoardList";
import useGame from "../../../../hooks/game/useGame";
import { useEffect } from "react";
import Link from "next/link";
export interface StoriesProps {
  gameID: string;
}
export default function Stories({ gameID }: StoriesProps) {
  //특정 게임에 대한 개발일지를 다룹니다.
  const { user } = useAuth();
  const {
    data: postData,
    isLoading: isPostLoading,
    setSize: setPostSize,
    mutate: mutatePost,
    isEmpty,
  } = useGameBoardList(["개발일지"], gameID, {
    search: "",
    boardType: "parent",
  });
  useEffect(() => {
    setPostSize(1);
  }, []);
  const {
    data: postData2,
    isLoading: isPostLoading2,

    mutate: mutatePost2,
  } = useGame(gameID);
  return (
    <CardContainer style={{ width: "90%", maxWidth: "100%" }}>
      <div style={{ display: "flex", flexDirection: "row", padding: "10px", maxWidth: "100%" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",

            width: "25%",
            height: "100%",
          }}
        >
          <Link
            href={gameID}
            style={{
              textDecoration: "none",
              color: "black",
            }}
          >
            {/* 여기는 좌측 */}
            <div style={{ display: "flex", flexDirection: "row", width: "200px", height: "60px" }}>
              <div style={{ width: "60px", height: "60px" }}>
                <Image
                  width={"100%"}
                  height={"100%"}
                  // radius={"lg"}
                  // fit="contain"
                  src={
                    "https://search.pstatic.net/sunny/?src=https%3A%2F%2Frepository-images.githubusercontent.com%2F201813095%2F8dced600-bd65-11e9-90e9-340ab5b2c23f&type=sc960_832"
                  }
                  // src={postData2?.data.iconUrl}
                />
              </div>
              <div
                style={{ width: "150px", height: "100%", display: "flex", alignItems: "center" }}
              >
                <Text fw={700} fz="ml">
                  {postData2?.data.title}
                </Text>
              </div>
            </div>
            <Image
              width={"100%"}
              height={"100%"}
              // radius={"lg"}
              // fit="contain"
              radius={"md"}
              src={
                "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzA3MTNfMTAz%2FMDAxNjg5MjUzNjY3NDQz.c6VImpgJ0qy1bRZGHiZVxfkRlqoW6UG1KY6MySFz8Acg.ZOb1WGfiq3B4pdgr8Gj272XBX_pe3BKODGBPRGMzGUUg.JPEG.wltndk97%2Foutput_4028971259.jpg&type=sc960_832"
              }
              // src={postData2?.data.shortImgUrl}
            />
            <Text style={{ marginTop: "20px" }} fw={500} fz="sm">
              {postData2?.data.information.description}
            </Text>
          </Link>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginLeft: "2rem",
            width: "100%",
            maxWidth: "100%",
            borderLeft: "0.5px solid gray ",
          }}
        >
          {/* 여기는 우측 */}
          <Carousel
            style={{ width: "100%", display: "flex", paddingLeft: "55px" }}
            slidesToScroll={3}
            slideSize="33%"
            slideGap={"20px"}
          >
            {postData?.map((data) => {
              console.log("data is ", data);
              return data.data.data.map((data: any) => (
                <Carousel.Slide>
                  <Link
                    href={gameID + "?board=" + data.id}
                    style={{
                      textDecoration: "none",
                      color: "black",
                    }}
                  >
                    <div
                      style={{
                        marginTop: "20px",
                        width: "100%",
                        height: "100%",
                        paddingLeft: "10px",
                        paddingRight: "10px",
                      }}
                    >
                      {/* 
               여기에 애들 들어가야함 */}
                      <Story story={data}></Story>
                    </div>
                  </Link>
                </Carousel.Slide>
              ));
            })}
          </Carousel>
        </div>
      </div>
    </CardContainer>
  );
}
