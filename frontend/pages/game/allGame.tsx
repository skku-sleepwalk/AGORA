import SearchBar from "../../components/pages/game/AllGame/SearchBar";
import SideBar from "../../components/pages/game/AllGame/SideBar";
import { MainTab } from "../../components/pages/game/MainTab/MainTab";
import SmallPost from "../../components/pages/game/SmallPost/SmallPost";
import useAllGame from "../../hooks/game/useAllGame";
import { useState } from "react";
import MainLayout from "../../components/pages/game/MainLayout/MainLayout";
import { MainCarousel } from "../../components/pages/game/MainCarousel/MainCarousel";
interface DataItem {
  id: string;
  checked: boolean;
}
export default function allGame() {
  const [genreList, setGenre] = useState([
    { id: "디펜스", checked: true },
    { id: "비주얼노벨", checked: true },
    { id: "시뮬레이션", checked: true },
    { id: "액션", checked: true },
    { id: "어드벤처", checked: true },
    { id: "전략", checked: true },
    { id: "캐주얼", checked: true },
    { id: "퍼즐", checked: true },
    { id: "플랫포머", checked: true },
    { id: "RPG", checked: true },
  ]);

  const [search, setsearch] = useState("");
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
    search: search,
  });

  const toggleCheck = (id: string) => {
    setGenre((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };
  ///
  return (
    <MainLayout tapSection={<MainTab active="allGame" />}>
      <div style={{ display: "flex", flexDirection: "column" }}>
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
              <SearchBar setsearch={setsearch}></SearchBar>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                paddingTop: "2rem",
                width: "100%",
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
                    gap: "1rem",
                    flexWrap: "wrap",
                  }}
                >
                  {
                    postData?.map((data) => {
                      return data.data.data.map((data) => {
                        return <SmallPost key={data?.id || ""} post={data || null}></SmallPost>;
                      });
                    })
                    // postData?.[0]?.data?.data[0]?.id != undefined && (
                    //   <div style={{ width: "85%", height: "85%" }}>
                    //     <SmallPost
                    //       key={postData[0].data.data[0]?.id || ""}
                    //       post={postData[0].data.data[0] || null}
                    //     ></SmallPost>
                    //   </div>
                    // )
                  }

                  {/* 스토리 4개 */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
