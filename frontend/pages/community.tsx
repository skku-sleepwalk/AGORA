import { useRouter } from "next/router";
import CommunityLayout from "../components/pages/community/CommunityLayout/CommunityLayout";
import PostWriter from "../components/pages/community/PostWriter/PostWriter";
import { Stack } from "@mantine/core";
import PostViewer from "../components/pages/community/PostViewer/PostViewer";
import SearchBar from "../components/pages/community/SearchBar/SearchBar";
import SearchTab from "../components/pages/community/SearchTab/SearchTab";
import { RightSidebar } from "../components/pages/community/RightSidebar/RightSidebar";
import { CommunityCategory } from "../components/pages/community/CommunityCategory/CommunityCategory";
import useBoardList from "../hooks/useBoardList";
import { LoadingPost } from "../components/pages/community/LoadingPost/LoadingPost";
import { useWindowScroll } from "@mantine/hooks";
import { createContext, useEffect, useState } from "react";
import { CategoryNum, Values } from "../constants/category";
import { extractThumbnailUrl } from "../utils/api/ViewPhotos";
import { PopularPost } from "../components/pages/community/PopularPost/PopularPost";

export const CommunityContext = createContext({
  mutatePost: () => {},
});

function Community() {
  const router = useRouter();
  const search = router.query.search;

  let data = new Array();
  for (let i = 0; i < CategoryNum; i++) {
    const values = Values[i];
    values.map((value) => {
      data.push(value.label);
    });
  }

  const [categorystrings, setcategory] = useState(data);

  const [tab, setTab] = useState<string>("post");

  const {
    data: postData,
    isLoading: isPostLoading,
    setSize: setPostSize,
    mutate: mutatePost,
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
    <CommunityContext.Provider
      value={{
        mutatePost,
      }}
    >
      <CommunityLayout
        leftSection={
          <Stack spacing={16}>
            <CommunityCategory
              onCategoryChange={(category) => {
                setcategory(category);
              }}
            />
            <PopularPost/>
          </Stack>
        }
        rightSection={
          <RightSidebar
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
            return data.data.map((data) => (
              <PostViewer key={data.id} post={data} thumbnailUrl={extractThumbnailUrl(data)} />
            ));
          })}
          {isPostLoading && <LoadingPost />}
        </Stack>
      </CommunityLayout>
    </CommunityContext.Provider>
  );
}

export default Community;
