import CommunityLayout from "../components/pages/community/CommunityLayout/CommunityLayout";

import { SideBar } from "../components/pages/community/sidebar/SideBar";

function Main() {
  return (
    <CommunityLayout
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

