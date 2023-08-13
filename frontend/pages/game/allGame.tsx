import SearchBar from "../../components/pages/game/AllGame/SearchBar";
import SideBar from "../../components/pages/game/AllGame/SideBar";
import { MainTab } from "../../components/pages/game/MainTab/MainTab";
import SmallPost from "../../components/pages/game/SmallPost/SmallPost";
import useAllGame from "../../hooks/game/useAllGame";
import { useState } from "react";
interface DataItem {
  id: string;
  checked: boolean;
}
export default function allGame() {
  //// 임시용 추후 수정 필
  const genreName = "FPS";
  const [genreList, setGenre] = useState([
    { id: "FPS", checked: true },
    { id: "B", checked: true },
    { id: "C", checked: true },
  ]);
  function filterCheckedIds(data: DataItem[]): string[] {
    const checkedIds: string[] = [];
    for (const item of data) {
      if (item.checked) {
        checkedIds.push(item.id);
      }
    }
    return checkedIds;
  }
  const {
    data: postData,
    isLoading: isPostLoading,
    setSize: setPostSize,
    mutate: mutatePost,
    isEmpty,
  } = useAllGame({
    genreNames: filterCheckedIds(genreList),
    search: "",
  });
  console.log(filterCheckedIds(genreList));
  console.log("");

  const toggleCheck = (id: string) => {
    setGenre((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };
  ///
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ position: "sticky", top: "70px", zIndex: "1000" }}>
        <MainTab active="allGame"></MainTab>
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        {/* 헤더 하단 */}
        <div style={{ width: "20%" }}>
          {/* 좌측 사이드바 */}
          <SideBar genreList={genreList} setGenre={toggleCheck}></SideBar>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "80%",
          }}
        >
          {/* 우측 */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              paddingTop: "50px",
            }}
          >
            {/* 검색창 */}
            <SearchBar></SearchBar>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              paddingTop: "2rem",
            }}
          >
            {/* 게임들 */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                width: "80%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                {postData?.[0]?.data?.data[0]?.id != undefined && (
                  <div style={{ width: "85%", height: "85%" }}>
                    <SmallPost
                      key={postData[0].data.data[0]?.id || ""}
                      post={postData[0].data.data[0] || null}
                    ></SmallPost>
                  </div>
                )}

                {/* 스토리 4개 */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
