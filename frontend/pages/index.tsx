import { MOCKUP_USER } from "../mockups/user";
import Comment from "../components/pages/community/PostViewer/PostDetailViewer/CommentSection/Comment/Comment";
import CommentEditor from "../components/pages/community/PostViewer/PostDetailViewer/CommentSection/CommentEditor/CommentEditor";
import PostViewer from "../components/pages/community/PostViewer/PostViewer";
import { MOCKUP_CONTENT } from "../mockups/post";

function Main() {
  return (
    <PostViewer
      user={MOCKUP_USER}
      date="2021-08-01T00:00:00.000Z"
      title="마냥 놀고만 싶지만 돈 벌어야지"
      content={MOCKUP_CONTENT}
      thumbnailUrl="https://cdn.class101.net/images/171f6948-4553-4cd4-9fcd-98f9dd61c547/1200x630"
    />
  );
}

export default Main;
