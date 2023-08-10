import { Carousel } from "@mantine/carousel";
import BestStory from "./BestStory";
export default function BestStories() {
  //전체 게임에서 주요 개발일지를 다룹니다.

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        marginLeft: "2rem",
        width: "100%",
        maxWidth: "100%",
      }}
    >
      {/* 여기는 우측 */}
      <Carousel
        style={{ width: "100%", display: "flex", paddingLeft: "10px", paddingRight: "10px" }}
        slidesToScroll={4}
        slideSize="24%"
        slideGap={"20px"}
      >
        <Carousel.Slide>
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
            <BestStory></BestStory>
          </div>
        </Carousel.Slide>
        <Carousel.Slide>
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
            <BestStory></BestStory>
          </div>
        </Carousel.Slide>
        <Carousel.Slide>
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
            <BestStory></BestStory>
          </div>
        </Carousel.Slide>
        <Carousel.Slide>
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
            <BestStory></BestStory>
          </div>
        </Carousel.Slide>
      </Carousel>
    </div>
  );
}
