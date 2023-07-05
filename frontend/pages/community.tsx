import { useRouter } from "next/router";
import CommunityLayout from "../components/pages/community/CommunityLayout/CommunityLayout";
import PostWriter from "../components/pages/community/PostWriter/PostWriter";
import { Stack } from "@mantine/core";
import PostViewer from "../components/pages/community/PostViewer/PostViewer";
import { MOCKUP_CONTENT } from "../mockups/post";
import { MOCKUP_USER } from "../mockups/user";
import SearchBar from "../components/pages/community/SearchBar/SearchBar";
import SearchTab from "../components/pages/community/SearchTab/SearchTab";
import { SideBar } from "../components/pages/community/sidebar/SideBar";
import { LeftSidebar } from "../components/pages/community/LeftSidebar/LeftSidebar";
import { PopularPost } from "../components/pages/community/PopularPost/PopularPost";

function Community() {
  const router = useRouter();
  const search = router.query.search;

  return (
    <CommunityLayout
      leftSection={
        <Stack spacing={16}>
          <LeftSidebar
            onCategoryChange={(category) => {
              console.log(category);
            }}
          />
          <PopularPost>
            {/* onPopularPostChange={(popularPost) => {
              console.log(popularPost);
            }} */}
          </PopularPost>
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
              onSubmit={(text) => {
                console.log(text);
              }}
            />
            <SearchTab
              onChange={(tab) => {
                console.log(tab);
              }}
            />
          </Stack>
        ) : (
          <PostWriter
            onSubmit={(values) => {
              console.log(values);
            }}
          />
        )}
        <PostViewer content={MOCKUP_CONTENT} user={MOCKUP_USER} date="2021-08-01" />
        <PostViewer content={MOCKUP_CONTENT} user={MOCKUP_USER} date="2021-08-01" />
        <PostViewer content={MOCKUP_CONTENT} user={MOCKUP_USER} date="2021-08-01" />
        <PostViewer content={MOCKUP_CONTENT} user={MOCKUP_USER} date="2021-08-01" />
        <PostViewer content={MOCKUP_CONTENT} user={MOCKUP_USER} date="2021-08-01" />
        <PostViewer content={MOCKUP_CONTENT} user={MOCKUP_USER} date="2021-08-01" />
        <PostViewer content={MOCKUP_CONTENT} user={MOCKUP_USER} date="2021-08-01" />
      </Stack>
    </CommunityLayout>
  );
}

export default Community;
