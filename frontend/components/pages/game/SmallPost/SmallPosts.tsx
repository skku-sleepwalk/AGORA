import { useState } from "react";
import SmallPost from "./SmallPost";
import { Text } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { extractThumbnailUrl } from "../../../../utils/api/ViewPhotos";

export function SmallPosts({ information }: any) {
  const [Title, setTitle] = useState("납량의 날 특집");

  const {
    data: postData,
    isLoading: isPostLoading,
    setSize: setPostSize,
    mutate: mutatePost,
    isEmpty,
  } = information;

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
          {postData?.map((data: any) => {
            return data.data.map((data: any) => (
              <Carousel.Slide>
                <div style={{ marginTop: "20px" }}>
                  <SmallPost key={data.id} post={data} thumbnailUrl={extractThumbnailUrl(data)} />
                </div>{" "}
              </Carousel.Slide>
            ));
          })}
        </Carousel>
      </div>
    </div>
  );
}
