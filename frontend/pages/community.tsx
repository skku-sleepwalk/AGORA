import { useRouter } from "next/router";
import CommunityLayout from "../components/pages/community/CommunityLayout/CommunityLayout";
import PostWriter from "../components/pages/community/PostWriter/PostWriter";
import { Stack } from "@mantine/core";
import PostViewer from "../components/pages/community/PostViewer/PostViewer";
import { MOCKUP_CONTENT } from "../mockups/post";
import { MOCKUP_USER } from "../mockups/user";
import SearchBar from "../components/pages/community/SearchBar/SearchBar";
import SearchTab from "../components/pages/community/SearchTab/SearchTab";
import { useCommunityStyles } from "../styles/pages/community.styles";

function Community() {
  const router = useRouter();
  const search = router.query.search;

  return (
    <CommunityLayout>
      <Stack spacing={50}>
        {search ? (
          <Stack spacing={20}>
            <SearchBar
              onSubmit={(text) => {
                console.log(text);
              }}
            />
            <SearchTab />
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
      </Stack>
    </CommunityLayout>
  );
}

export default Community;
