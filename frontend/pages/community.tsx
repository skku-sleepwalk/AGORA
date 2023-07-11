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
  const [tab, setTab] = useState<string>("post");
  const {
    data: postData,
    isLoading: isPostLoading,
    setSize: setPostSize,
  } = useBoardList(["Unity", "C#", "C", "C++"], {
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
              console.log(category);
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
