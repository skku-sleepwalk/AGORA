import { Box } from '@mantine/core';
import { LeftSidebar } from "../components/common/AppShell/LeftSidebar/LeftSidebar";
import { PhotoViewer } from "../components/common/AppShell/PhotoViewer/PhotoViewer";

function Main() {
  return (
    <Box>
      {/* <LeftSidebar/> */}
      <PhotoViewer/>
    </Box>
    )
}

export default Main;
