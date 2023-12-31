import { useRouter } from "next/router";
import CommunityLayout from "../../components/pages/community/CommunityLayout/CommunityLayout";
import PostWriter from "../../components/pages/community/PostWriter/PostWriter";
import { Stack, Text, useMantineTheme } from "@mantine/core";
import PostViewer from "../../components/pages/community/PostViewer/PostViewer";
import SearchBar from "../../components/pages/community/SearchBar/SearchBar";
import SearchTab from "../../components/pages/community/SearchTab/SearchTab";
import { SideBar } from "../../components/pages/community/sidebar/SideBar";
import useBoardList from "../../hooks/useBoardList";
import { LoadingPost } from "../../components/pages/community/LoadingPost/LoadingPost";
import { useWindowScroll } from "@mantine/hooks";
import { createContext, useEffect, useState } from "react";
import { CategoryNum, Values } from "../../constants/category";
import { extractThumbnailUrl } from "../../utils/api/ViewPhotos";
import { CommunityCategory } from "../../components/pages/community/CommunityCategory/CommunityCategory";

export const CommunityContext = createContext({
  mutatePost: () => {},
});

function Community() {
  const theme = useMantineTheme();
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
    isEmpty,
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
              {isEmpty && (
                <Text color={theme.colors.gray[4]}>
                  '{search.toString()}'로 검색된 결과가 없습니다.
                </Text>
              )}
            </Stack>
          ) : (
            <PostWriter />
          )}
          {postData?.map((data) => {
            return data.data.data.map((data) => (
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
