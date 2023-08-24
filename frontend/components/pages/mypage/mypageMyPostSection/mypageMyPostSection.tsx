import CardContainer from "../../../common/CardContainer/CardContainer";
import useAuth from "../../../../hooks/useAuth";
import useMyGameBoardList from "../../../../hooks/game/useMyGameBoardList";
import { useEffect } from "react";
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
    <CardContainer>
      {postData?.map((data) => {
        console.log("data is ", data);
        return data.data.data.map((data: any) => (
          <div
            style={{
              marginTop: "20px",
              width: "100%",
              height: "100%",
              paddingLeft: "10px",
              paddingRight: "10px",
            }}
          >
            {data.title}
          </div>
        ));
      })}
    </CardContainer>
  );
}
