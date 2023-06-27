import { createStyles } from "@mantine/core";
import image from "./Union.jpg";

export const useSideBarStyles = createStyles((theme) => ({
  SideBarContainer: {
    width: " 16.375rem",
    height: "43.4375rem",
    // flexShrink: 0,
    // background: "#F9FEFF",
    backgroundColor: "#F9FEFF",
    float: "right",
    padding: "0",
    boxShadow: "-4px 4px 4px 0px rgba(0, 0, 0, 0.50)",
    backgroundImage: "url(/Union.png)",
  },
  SideBarName: {
    float: "left",
    width: "5rem",
    height: "1.4375rem",
    flexShrink: 0,
    backgroundColor: "#9AE3EB",
    borderRadius: "0.3rem",
    marginTop: "1rem",
  },
  SideBarN: {
    marginTop: "0.2rem",
  },
  Search: {
    marginTop: "1rem",
    paddingTop: "1rem",
    paddingBottom: "1rem",

    width: "12.59619rem",
    height: "2rem",
    borderRadius: " 15px",
    border: "1px solid #757575",
    background: "#F3F3F3",
  },
  Grouping: {
    paddingBottom: "14rem",
  },
}));
