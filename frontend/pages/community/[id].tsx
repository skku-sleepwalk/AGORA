import { useRouter } from "next/router";
import useBoard from "../../hooks/useBoard";
import PostDetailViewer from "../../components/pages/community/PostDetailViewer/PostDetailViewer";
import { RightSidebar } from "../../components/pages/community/RightSidebar/RightSidebar";
import PostViewLayout from "../../components/pages/community/PostViewLayout/PostViewLayout";

function PostView() {
  const router = useRouter();
  const id = router.query.id ? router.query.id.toString() : undefined;
  const { data: post } = useBoard(id);

  return (
    <PostViewLayout
      rightSection={
        <RightSidebar
          onSearchSubmit={(text) => {
            console.log(text);
          }}
        />
      }
    >
      {post && <PostDetailViewer post={post} />}
    </PostViewLayout>
  );
}

export default PostView;
