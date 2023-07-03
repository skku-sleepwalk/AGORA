import CommunityLayout from "../components/pages/community/CommunityLayout/CommunityLayout";
import { LeftSidebar } from "../components/pages/community/LeftSidebar/LeftSidebar";


function Community() {
  return <CommunityLayout leftSection={<LeftSidebar></LeftSidebar>}></CommunityLayout>;
}

export default Community;
