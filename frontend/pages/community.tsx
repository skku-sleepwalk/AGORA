import CommunityLayout from "../components/pages/community/CommunityLayout/CommunityLayout";

import { LeftSidebar } from "../components/pages/community/LeftSidebar/LeftSidebar";
import { SideBar } from "../components/pages/community/sidebar/SideBar";

function Main() {
  return (
    <CommunityLayout
      leftSection={<LeftSidebar></LeftSidebar>}
      rightSection={
        <SideBar
          onSearchSubmit={(text) => {
            console.log(text);
          }}
        />
      }
    />
  );
}

export default Main;
