import { useState } from "react";
import SmallPost from "./SmallPost";
import { Text } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
export function SmallPosts() {
  const [Title, setTitle] = useState("납량의 날 특집");
  return (
    <div style={{ marginTop: "5rem" }}>
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
          height="25rem"
          withIndicators
          controlSize={30}
          maw={1400}
          includeGapInSize={true}
          previousControlIcon={<IconChevronLeft color="black" size={"3rem"}></IconChevronLeft>}
          nextControlIcon={<IconChevronRight color="black" size={"3rem"}></IconChevronRight>}
        >
          <Carousel.Slide>
            <div style={{ marginTop: "20px" }}>
              <SmallPost />
            </div>
          </Carousel.Slide>
          <Carousel.Slide>
            <div style={{ marginTop: "20px" }}>
              <SmallPost />
            </div>
          </Carousel.Slide>{" "}
          <Carousel.Slide>
            <div style={{ marginTop: "20px" }}>
              <SmallPost />
            </div>
          </Carousel.Slide>{" "}
          <Carousel.Slide>
            <div style={{ marginTop: "20px" }}>
              <SmallPost />
            </div>
          </Carousel.Slide>{" "}
          <Carousel.Slide>
            <div style={{ marginTop: "20px" }}>
              <SmallPost />
            </div>
          </Carousel.Slide>{" "}
          <Carousel.Slide>
            <div style={{ marginTop: "20px" }}>
              <SmallPost />
            </div>
          </Carousel.Slide>{" "}
          <Carousel.Slide>
            <div style={{ marginTop: "20px" }}>
              <SmallPost />
            </div>
          </Carousel.Slide>
        </Carousel>
      </div>
    </div>
  );
}
