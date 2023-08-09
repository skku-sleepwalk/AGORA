import CardContainer from "../../../common/CardContainer/CardContainer";
import { Carousel } from "@mantine/carousel";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import useAuth from "../../../../hooks/useAuth";
import { Image } from "@mantine/core";
import { Text } from "@mantine/core";
export default function Stories() {
  const { user } = useAuth();
  return (
    <CardContainer style={{ width: "90%", maxWidth: "100%" }}>
      <div style={{ display: "flex", flexDirection: "row", paddingTop: "10px" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            paddingTop: "10px",
            width: "20%",
            height: "100%",
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
              />
            </div>
            <div style={{ width: "150px", height: "100%", display: "flex", alignItems: "center" }}>
              <Text fw={700} fz="ml">
                Stardew Valley
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
          />
          <Text style={{ marginTop: "20px" }} fw={500} fz="sm">
            조자 주식회사에서 고단한 회사 생활을 하던 주인공은 어느 날 어릴 적 할아버지가 삶이
            힘들고 지칠 때 열어보라는 편지를 뜯어보게 된다. 편지에는 할아버지가 과거 살던 농장에서
            새 삶을 시작하라는 내용이 적혀있었고, 주인공은 한적한 지역인 스타듀 밸리의 펠리컨 마을로
            이사를 오게 된다.
          </Text>
        </div>

        <div style={{ display: "flex", flexDirection: "row", marginLeft: "3rem" }}>
          <Carousel
            slideSize="20%"
            align="start"
            slidesToScroll={5}
            slideGap="lg"
            height="25rem"
            withIndicators
            controlSize={30}
            maw={1400}
            includeGapInSize={true}
            previousControlIcon={<IconChevronLeft color="black" size={"3rem"}></IconChevronLeft>}
            nextControlIcon={<IconChevronRight color="black" size={"3rem"}></IconChevronRight>}
          >
            {/* <Carousel.Slide>
      <div style={{ marginTop: "20px" }}>
        <Text>1</Text>
      </div>
    </Carousel.Slide> */}
          </Carousel>
        </div>
      </div>
    </CardContainer>
  );
}
