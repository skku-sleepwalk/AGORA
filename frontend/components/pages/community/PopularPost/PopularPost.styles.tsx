import { createStyles } from "@mantine/core";

export const usePopularPostStyles = createStyles((theme) => ({
  PopularPostContainer: {
    boxSizing: "border-box",
    width: "16.313rem",

    position: "relative",
    float: "left",

    backgroundColor: "#FFF",
    boxShadow: "0px 3px 10px rgba(0, 0, 0, 0.2)",
    borderRadius: "15px",
  },
  PopularPostText: {
    display: "block",
    position: "relative",
    paddingTop: "1.25rem",
    paddingBottom: "0.938rem",

    fontWeight: 500,
    fontSize: 20,
    color: "#000",
  },
  content: {
    lineHeight: 1.5,
    maxWidth: '6.5rem',
    overflow: "hidden",
    borderBottom: "none",
    fontSize: 'xs',
  },
  Badge:{
    padding: '0px 7px',
    textAlign: 'left',
    justifyContent: 'flex-start',
    backgroundColor: "#F3F3F3",

    ".mantine-Badge-root": {
      textDecoration: 'none',
    },
    ".mantine-Badge-inner": {
      fontWeight: 'normal',
      color: "black",
    },
    "&:hover": {
      textDecoration: "none",
      cursor: 'pointer',
    },
  },
  PaddingBottom: {
    paddingBottom: "1.25rem",
  },
}));
