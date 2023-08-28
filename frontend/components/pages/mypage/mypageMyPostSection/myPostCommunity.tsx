import { removeImgTags } from "../../../../utils/api/ViewPhotos";
import { Image } from "@mantine/core";
import { Text } from "@mantine/core";
import { IconMessage, IconHeart, Icon123, IconShare, IconBookmark } from "@tabler/icons-react";
import { GameBoard } from "../../../../types/api/game/gameBoard";
import { extractImageSrc } from "../../../../utils/api/ViewPhotos";
import CardContainer from "../../../common/CardContainer/CardContainer";
import { MOCKUP_CONTENT } from "../../../../mockups/post";
import Link from "next/link";

export interface myPostProps {
  myPost: GameBoard;
}
export default function MyPostCommunity({ myPost }: myPostProps) {
  const thumbnailUrl = extractImageSrc(myPost.content)[0];
  console.log("hm", myPost.content);
  //   let removeImgTag = removeImgTags(myPost.content);
  //   removeImgTag = removeImgTag.replace(/<\/?p[^>]*>/g, "");
  let tmpContent = MOCKUP_CONTENT;
  function truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) {
      const spacesToAdd = maxLength - text.length;
      const spaces = "\u00A0".repeat(spacesToAdd);
      console.log((text + spaces).length);
      return text + spaces;
    } else {
      return text.slice(0, maxLength) + "...";
    }
  }

  const maxLength = 120;
  tmpContent = truncateText(tmpContent, maxLength);
  return (
    <Link
      href={"community/" + myPost.id}
      style={{
        textDecoration: "none",
        color: "black",
      }}
    >
      {/* // *** 
      // 현재 백엔드 game 없음
       // *** */}
      <CardContainer style={{ padding: "0", height: "12rem", overflow: "hidden" }}>
        <div style={{ display: "flex", flexDirection: "row", width: "100%", height: "100%" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              // justifyContent: "center",
              minHeight: "12rem",
            }}
          >
            <Image
              radius={"15px"}
              width={"85%"}
              height={"50%"}
              src={
                thumbnailUrl == ""
                  ? "https://search.pstatic.net/common/?src=http%3A%2F%2Fcafefiles.naver.net%2FMjAxODEwMjRfNDEg%2FMDAxNTQwMzUzNTAwMTQ0.wxjl7nnlaOr8DUuka8JmPxatZa2_KA4kzVHJNebMJb4g.JoZyVWkEpXmbU668fWGJYvNJ67jrR83IUfA1P1XRbc4g.JPEG.225prima%2FexternalFile.jpg&type=sc960_832"
                  : thumbnailUrl
              }
            ></Image>
          </div>
          <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%" }}>
            <div>
              <Text style={{ marginTop: "2rem" }} fw={700} fz="ml">
                {myPost.title}
              </Text>
            </div>
            <div>
              <Text
                style={{ marginTop: "20px", height: "4rem", paddingRight: "40px" }}
                fw={500}
                fz="sm"
              >
                {/* {removeImgTag} */}
                {tmpContent}
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
                <div style={{ paddingTop: "5px", paddingLeft: "5px" }}>{myPost.likeCount}</div>
              </div>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <IconMessage></IconMessage>
                <div style={{ paddingTop: "5px", paddingLeft: "5px" }}>{myPost.childCount}</div>
              </div>

              <IconShare></IconShare>
              <IconBookmark></IconBookmark>
            </div>
          </div>
        </div>
      </CardContainer>
    </Link>
  );
}
