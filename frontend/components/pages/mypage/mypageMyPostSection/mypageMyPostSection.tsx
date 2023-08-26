import CardContainer from "../../../common/CardContainer/CardContainer";
import useAuth from "../../../../hooks/useAuth";
import useMyGameBoardList from "../../../../hooks/game/useMyGameBoardList";
import { useEffect, useState } from "react";
import Link from "next/link";
import Story from "../../game/DevelopStories/story";
import MyPost from "./myPost";
import { Button } from "@mantine/core";
import MyPostCommunity from "./myPostCommunity";
import useMyCommunityPost from "../../../../hooks/game/useMyCommunityPost";
export function MypageMyPostSection() {
  const { user, token } = useAuth();
  const {
    data: postData,
    isLoading: isPostLoading,
    setSize: setPostSize,
    mutate: mutatePost,
    isEmpty,
  } = useMyGameBoardList();
  const {
    data: postDataC,
    isLoading: isPostLoadingC,
    setSize: setPostSizeC,
    mutate: mutatePostC,
  } = useMyCommunityPost();
  useEffect(() => {
    setPostSize(1);
  }, []);
  const [switcher, setSwitch] = useState("게임");

  return (
    <div style={{ width: "100%" }}>
      <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
        <Button
          onClick={() => {
            setSwitch("게임");
          }}
          style={{
            background: "white",
            color: "black",
            border: "1px solid black",
            marginRight: "10px",
          }}
        >
          게임
        </Button>
        <Button
          onClick={() => {
            setSwitch("커뮤니티");
          }}
          style={{ background: "white", color: "black", border: "1px solid black" }}
        >
          커뮤니티
        </Button>
      </div>

      {switcher === "게임" &&
        postData?.map((data) => {
          console.log("data is ", data);
          return data.data.data.map((data: any) => (
            // <Link
            //   href={gameID + "?board=" + data.id}
            //   style={{
            //     textDecoration: "none",
            //     color: "black",
            //   }}
            // >
            <div
              style={{
                marginTop: "20px",
                width: "100%",
                // height: "100%",
                paddingLeft: "10px",
                paddingRight: "10px",
              }}
            >
              {/* 
               여기에 애들 들어가야함 */}
              <MyPost myPost={data}></MyPost>
            </div>
            // </Link>
          ));
        })}

      {switcher === "커뮤니티" &&
        postDataC?.map((data) => {
          console.log("data is ", data);
          return data.data.data.map((data: any) => (
            // <Link
            //   href={gameID + "?board=" + data.id}
            //   style={{
            //     textDecoration: "none",
            //     color: "black",
            //   }}
            // >
            <div
              style={{
                marginTop: "20px",
                width: "100%",
                // height: "100%",
                paddingLeft: "10px",
                paddingRight: "10px",
              }}
            >
              {/* 
               여기에 애들 들어가야함 */}
              <MyPostCommunity myPost={data}></MyPostCommunity>
            </div>
            // </Link>
          ));
        })}
    </div>
  );
}
