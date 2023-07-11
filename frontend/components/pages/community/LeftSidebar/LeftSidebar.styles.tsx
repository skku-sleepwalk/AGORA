import { createStyles } from "@mantine/core";

export const useLeftSidebarStyles = createStyles((theme) => ({
  CategoryContainer: {
    boxSizing: "border-box",
    width: "16.313rem",

    position: "relative",
    float: "left",

    backgroundColor: "#FFF",
    boxShadow: "0px 3px 10px rgba(0, 0, 0, 0.2)",
    borderRadius: "15px",
  },

  CategoryText: {
    display: "block",
    position: "relative",
    paddingTop: "1.25rem",
    paddingBottom: "0.938rem",

    fontWeight: 500,
    fontSize: 20,
    color: "#000",
  },

  DropDownButton: {
    display: "inline-block",

    boxSizing: "border-box",
    height: "1.25rem",
    padding: "0px 5px",
  },

  CheckboxGroup: {
    display: "block",
    position: "relative",
    width: "100%",
  },

  PaddingTop: {
    paddingTop: "0.625rem",
  },

  PaddingBottom: {
    paddingBottom: "1.25rem",
  },
}));
