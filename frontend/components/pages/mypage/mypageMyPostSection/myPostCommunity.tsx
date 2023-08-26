import { removeImgTags } from "../../../../utils/api/ViewPhotos";
import { Image } from "@mantine/core";
import { Text } from "@mantine/core";
import { IconMessage, IconHeart, Icon123, IconShare, IconBookmark } from "@tabler/icons-react";
import { GameBoard } from "../../../../types/api/game/gameBoard";
import { extractImageSrc } from "../../../../utils/api/ViewPhotos";
import CardContainer from "../../../common/CardContainer/CardContainer";
export interface myPostProps {
  myPost: GameBoard;
}
export default function MyPostCommunity({ myPost }: myPostProps) {
  const thumbnailUrl = extractImageSrc(myPost.content)[0];
  console.log("hm", myPost.content);
  //   let removeImgTag = removeImgTags(myPost.content);
  //   removeImgTag = removeImgTag.replace(/<\/?p[^>]*>/g, "");
  return (
    <CardContainer style={{ padding: "0" }}>
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
            <Text style={{ marginTop: "5rem" }} fw={700} fz="ml">
              {myPost.title}
            </Text>
          </div>
          {/* <div>
        <Text style={{ marginTop: "20px", height: "100px" }} fw={500} fz="sm">
          {removeImgTag}
        </Text>
      </div> */}
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
  );
}
