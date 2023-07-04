import { createStyles } from "@mantine/core";
import image from "./Union.jpg";

export const useSideBarStyles = createStyles((theme) => ({
  SideBarContainer: {
    width: "16.375rem",
    height: "100vh",
    position: "fixed",
    // flexShrink: 0,
    // background: "#F9FEFF",
    backgroundColor: "#F9FEFF",
    float: "right",
    padding: "0",
    boxShadow: "-4px 4px 4px 0px rgba(0, 0, 0, 0.50)",
  },
  SideBarName: {
    float: "left",
    width: "5rem",
    height: "1.4375rem",

    backgroundColor: "#9AE3EB",
    borderRadius: "0.3rem",
    marginTop: "1rem",
  },
  SideBarN: {
    marginTop: "0.2rem",
  },

  Search: {
    // paddingTop: "3rem",
    // paddingTop: "1rem",
    // paddingBottom: "1rem",
    // // backgroundImage:
    // //   "url(https://cdn1.iconfinder.com/data/icons/hawcons/32/698627-icon-111-search-256.png)",
    // width: "12.59619rem",
    // height: "2rem",
    // borderRadius: " 15px",
    // border: "1px solid #757575",
    // backgroundColor: "#F3F3F3",
    width: "12.59619rem",
    height: "2rem",
    ".mantine-TextInput-wrapper": {
      // paddingTop: "1rem",
      // paddingBottom: "1rem",

      borderRadius: " 15px",
      border: "1px solid #757575",
      backgroundColor: "#F3F3F3",
    },
    ".mantine-TextInput-input": {
      border: "none",
      backgroundColor: "transparent",
    },
  },

  Grouping: {
    marginBottom: "14rem",
    paddingLeft: "1rem",
  },
}));
