import { removeImgTags } from "../../../../utils/api/ViewPhotos";
import { Image } from "@mantine/core";
import { Text } from "@mantine/core";
import CardContainer from "../../../common/CardContainer/CardContainer";
import { extractImageSrc } from "../../../../utils/api/ViewPhotos";
import {
  IconMessage,
  IconHeart,
  Icon123,
  IconShare,
  IconBookmark,
  IconChevronLeft,
} from "@tabler/icons-react";
import { GameBoard } from "../../../../types/api/game/gameBoard";
export interface BestStoryProps {
  story: GameBoard;
}
export default function BestStory({ story }: BestStoryProps) {
  const thumbnailUrl = extractImageSrc(story.content)[0];
  let removeImgTag = removeImgTags(story.content);
  removeImgTag = removeImgTag.replace(/<\/?p[^>]*>/g, "");
  console.log(story);
  return (
    <CardContainer style={{ paddingTop: "15px", paddingLeft: "0", paddingRight: "0" }}>
      <div style={{ height: "100%", width: "100%", display: "flex", flexDirection: "column" }}>
        <div
          style={{
            height: "10%",
            width: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            paddingLeft: "5px",
          }}
        >
          <IconChevronLeft></IconChevronLeft>

          <Text fw={700} fz="ml">
            Stardew Valley
          </Text>
        </div>
        <div style={{ width: "100%", height: "40%", paddingTop: "12px", minHeight: "225px" }}>
          {/* max도 걸어야 할 것 같지만 일단 넘어가자 */}
          <Image
            width={"100%"}
            height={"100%"}
            src={
              thumbnailUrl == ""
                ? "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzA3MTNfMTAz%2FMDAxNjg5MjUzNjY3NDQz.c6VImpgJ0qy1bRZGHiZVxfkRlqoW6UG1KY6MySFz8Acg.ZOb1WGfiq3B4pdgr8Gj272XBX_pe3BKODGBPRGMzGUUg.JPEG.wltndk97%2Foutput_4028971259.jpg&type=sc960_832"
                : thumbnailUrl
            }
          ></Image>
        </div>
        <div style={{ paddingLeft: "10px", paddingRight: "10px" }}>
          {/* 하단 전체 */}
          <div
            style={{
              height: "10%",
              width: "100%",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "10px",
              marginTop: "5px",
            }}
          >
            <div style={{ width: "30px", height: "30px" }}>
              <Image
                width={"100%"}
                height={"100%"}
                radius={"lg"}
                // fit="contain"
                src={
                  "https://search.pstatic.net/sunny/?src=https%3A%2F%2Frepository-images.githubusercontent.com%2F201813095%2F8dced600-bd65-11e9-90e9-340ab5b2c23f&type=sc960_832"
                }
              />
            </div>
            <div style={{ width: "150px", height: "100%", display: "flex", alignItems: "center" }}>
              <Text fw={700} fz="ml">
                {story.author.name}
              </Text>
            </div>
          </div>
          <div>
            <Text style={{ marginTop: "10px" }} fw={700} fz="ml">
              {story.title}
            </Text>
          </div>
          <div>
            <Text style={{ marginTop: "20px", height: "100px" }} fw={500} fz="sm">
              {removeImgTag}
            </Text>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              paddingRight: "50px",
              paddingBottom: "20px",
            }}
          >
            <div style={{ display: "flex", flexDirection: "row" }}>
              <IconHeart></IconHeart>
              <div style={{ paddingTop: "5px", paddingLeft: "5px" }}>{story.likeCount}</div>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <IconMessage></IconMessage>
              <div style={{ paddingTop: "5px", paddingLeft: "5px" }}>{story.childCount}</div>
            </div>

            <IconShare></IconShare>
            <IconBookmark></IconBookmark>
          </div>
        </div>
      </div>
    </CardContainer>
  );
}
