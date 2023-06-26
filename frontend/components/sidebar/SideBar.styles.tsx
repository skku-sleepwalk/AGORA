import { createStyles } from "@mantine/core";

export const useSideBarStyles = createStyles((theme) => ({
  SideBarContainer: {
    width: " 16.375rem",
    height: "43.4375rem",
    flexShrink: 0,
    // background: "#F9FEFF",
    backgroundColor: "skyblue",
    float: "right",
    boxShadow: "-4px 4px 4px 0px rgba(0, 0, 0, 0.50)",
  },
  SideBarName: {
    float: "left",
    width: " 6rem",
    height: "1.4375rem",
    flexShrink: 0,
    backgroundColor: "#9AE3EB",
  },
  Grouping: {
    paddingBottom: "2rem",
  },
}));
