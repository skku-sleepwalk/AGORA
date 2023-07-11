import { useRouter } from "next/router";
import CommunityLayout from "../components/pages/community/CommunityLayout/CommunityLayout";
import PostWriter from "../components/pages/community/PostWriter/PostWriter";
import { Stack } from "@mantine/core";
import PostViewer from "../components/pages/community/PostViewer/PostViewer";
import SearchBar from "../components/pages/community/SearchBar/SearchBar";
import SearchTab from "../components/pages/community/SearchTab/SearchTab";
import { SideBar } from "../components/pages/community/sidebar/SideBar";
import { LeftSidebar } from "../components/pages/community/LeftSidebar/LeftSidebar";
import useBoardList from "../hooks/useBoardList";
import { LoadingPost } from "../components/pages/community/LoadingPost/LoadingPost";
import { useWindowScroll } from "@mantine/hooks";
import { useEffect, useState } from "react";

function Community() {
  const router = useRouter();
  const search = router.query.search;

  const [categorystrings, setcategory] = useState([
    "Unity",
    "C#",
    "Python",
    "캐릭터",
    "적",
    "배경",
    "Unity 공모전",
    "C# 공모전",
    "Python 공모전",
    "배경 음악",
    "효과음",
    "퍼블리싱",
    "게임 시작",
    "설정",
    "팀원 모집",
    "자금",
    "유니티 입문",
    "얼리얼 입문",
  ]);

  const [tab, setTab] = useState<string>("post");

  const {
    data: postData,
    isLoading: isPostLoading,
    setSize: setPostSize,
 //여기를 건드려야함

  } = useBoardList(categorystrings, {
    search: search ? search.toString() : undefined,
    boardType: tab == "post" ? "parent" : "child",
  });

  const [{ y: scrollY }, scrollTo] = useWindowScroll();
  const [scrollThreshold, setScrollThreshold] = useState(0);

  useEffect(() => {
    if (scrollY >= scrollThreshold) {
      setPostSize((prev) => prev + 1);
      setScrollThreshold((prev) => prev + 1000);
      console.log("scroll");
    }
  }, [scrollY]);

  return (
    <CommunityLayout
      leftSection={
        <Stack spacing={16}>
          <LeftSidebar
            onCategoryChange={(category) => {
              setcategory(category);
            }}
          />
        </Stack>
      }
      rightSection={
        <SideBar
          onSearchSubmit={(text) => {
            console.log(text);
          }}
        />
      }
    >
      <Stack spacing={50}>
        {search ? (
          <Stack spacing={20}>
            <SearchBar
              defaultValue={search.toString()}
              onSubmit={(text) => {
                router.push(`?search=${text}`);
              }}
            />
            <SearchTab
              onChange={(tab) => {
                setTab(tab);
              }}
            />
          </Stack>
        ) : (
          <PostWriter />
        )}
        {postData?.map((data) => {
          return data.data.map((data) => <PostViewer key={data.id} post={data} />);
        })}
        {isPostLoading && <LoadingPost />}
      </Stack>
    </CommunityLayout>
  );
}

export default Community;
