import CardContainer from "../../../common/CardContainer/CardContainer";
import useAuth from "../../../../hooks/useAuth";
import useMyGameBoardList from "../../../../hooks/game/useMyGameBoardList";
import { useEffect } from "react";
import Link from "next/link";
import Story from "../../game/DevelopStories/story";
import MyPost from "./myPost";
export function MypageMyPostSection() {
  const { user, token } = useAuth();
  const {
    data: postData,
    isLoading: isPostLoading,
    setSize: setPostSize,
    mutate: mutatePost,
    isEmpty,
  } = useMyGameBoardList();
  useEffect(() => {
    setPostSize(1);
  }, []);

  return (
    <div>
      {postData?.map((data) => {
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
              height: "100%",
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
    </div>
  );
}
