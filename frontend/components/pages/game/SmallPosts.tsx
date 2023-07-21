import { useState } from "react";
import SmallPost from "./SmallPost";
import { Text } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
export function SmallPosts() {
  const [Title, setTitle] = useState("납량의 날 특집");
  return (
    <div>
      <Text
        style={{ marginLeft: "40px", marginTop: "20px", marginBottom: "30px" }}
        size={25}
        weight={"bold"}
      >
        {Title}
      </Text>

      <div style={{ display: "flex", flexDirection: "row", marginLeft: "3rem" }}>
        <Carousel
          slideSize="20%"
          align="start"
          slidesToScroll={5}
          slideGap="lg"
          height={350}
          withIndicators
          controlSize={30}
          maw={1400}
          includeGapInSize={true}
          previousControlIcon={<IconChevronLeft color="black" size={"3rem"}></IconChevronLeft>}
          nextControlIcon={<IconChevronRight color="black" size={"3rem"}></IconChevronRight>}
        >
          {/* 
<div style={{ width: "230px", marginLeft: "30px", marginTop: "17px" }}>
  </div> */}
          <Carousel.Slide>
            <div style={{ marginTop: "17px" }}>
              <SmallPost />
            </div>
          </Carousel.Slide>
          <Carousel.Slide>
            <div style={{ marginTop: "17px" }}>
              <SmallPost />
            </div>
          </Carousel.Slide>{" "}
          <Carousel.Slide>
            <div style={{ marginTop: "17px" }}>
              <SmallPost />
            </div>
          </Carousel.Slide>{" "}
          <Carousel.Slide>
            <div style={{ marginTop: "17px" }}>
              <SmallPost />
            </div>
          </Carousel.Slide>{" "}
          <Carousel.Slide>
            <div style={{ marginTop: "17px" }}>
              <SmallPost />
            </div>
          </Carousel.Slide>{" "}
          <Carousel.Slide>
            <div style={{ marginTop: "17px" }}>
              <SmallPost />
            </div>
          </Carousel.Slide>{" "}
          <Carousel.Slide>
            <div style={{ marginTop: "17px" }}>
              <SmallPost />
            </div>
          </Carousel.Slide>
        </Carousel>
      </div>
    </div>
  );
}
