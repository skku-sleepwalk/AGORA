import { useRouter } from "next/router";
import useBoard from "../../hooks/useBoard";
import PostDetailViewer from "../../components/pages/community/PostDetailViewer/PostDetailViewer";
import { RightSidebar } from "../../components/pages/community/RightSidebar/RightSidebar";
import CommunityLayout from "../../components/pages/community/CommunityLayout/CommunityLayout";
import { PopularPost } from "../../components/pages/community/PopularPost/PopularPost";

function PostView() {
  const router = useRouter();
  const id = router.query.id ? router.query.id.toString() : undefined;
  const { data: post } = useBoard(id);

  return (
    <CommunityLayout
      leftSection={<PopularPost />}
      rightSection={
        <RightSidebar
          onSearchSubmit={(text) => {
            console.log(text);
          }}
        />
      }
    >
      {post && <PostDetailViewer post={post} />}
    </CommunityLayout>
  );
}

export default PostView;
