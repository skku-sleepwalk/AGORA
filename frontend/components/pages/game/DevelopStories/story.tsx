import { removeImgTags } from "../../../../utils/api/ViewPhotos";
import { Image } from "@mantine/core";
import { Text } from "@mantine/core";
import { IconMessage, IconHeart, Icon123, IconShare, IconBookmark } from "@tabler/icons-react";
import { GameBoard } from "../../../../types/api/game/gameBoard";
import { extractImageSrc } from "../../../../utils/api/ViewPhotos";
export interface StoryProps {
  story: GameBoard;
}
export default function Story({ story }: StoryProps) {
  const thumbnailUrl = extractImageSrc(story.content)[0];
  let removeImgTag = removeImgTags(story.content);
  removeImgTag = removeImgTag.replace(/<\/?p[^>]*>/g, "");
  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "12rem",
        }}
      >
        <Image
          radius={"md"}
          width={"85%"}
          height={"50%"}
          src={
            thumbnailUrl == ""
              ? "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzA3MTNfMTAz%2FMDAxNjg5MjUzNjY3NDQz.c6VImpgJ0qy1bRZGHiZVxfkRlqoW6UG1KY6MySFz8Acg.ZOb1WGfiq3B4pdgr8Gj272XBX_pe3BKODGBPRGMzGUUg.JPEG.wltndk97%2Foutput_4028971259.jpg&type=sc960_832"
              : thumbnailUrl
          }
        ></Image>
      </div>
      <div>
        <Text style={{ marginTop: "20px" }} fw={700} fz="ml">
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
  );
}
