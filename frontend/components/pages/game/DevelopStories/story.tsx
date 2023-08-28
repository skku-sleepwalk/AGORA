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
          // overflow: "hidden",
        }}
      >
        <Image
          radius={"md"}
          width={"85%"}
          height={"50%"}
          src={
            thumbnailUrl == ""
              ? "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMTEwMjJfMTM5%2FMDAxNjM0ODY5NDAzMjQ4.i1SXWZ0IN9-_q9dabo6H4YrwhyoWYSzne1NBYAjueDwg.I1dhjPYvame_0hh7OwYwTuT2n_8IivkicMo92vaIwWAg.JPEG.happy_mkt%2F0_%25C0%25CC%25B9%25CC%25C1%25F6%25B0%25CB%25BB%25F6_%25B1%25E2%25B4%25C9_%25C3%25DF%25B0%25A12.jpg&type=sc960_832"
              : thumbnailUrl
          }
        ></Image>
      </div>
      <div>
        <Text style={{ marginTop: "1.25rem" }} fw={700} fz="ml">
          {story.title}
        </Text>
      </div>
      <div>
        <Text style={{ marginTop: "1.25rem", height: "10rem" }} fw={500} fz="sm">
          {removeImgTag}
        </Text>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          paddingRight: "2rem",
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
