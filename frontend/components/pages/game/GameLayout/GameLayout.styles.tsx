import { createStyles } from "@mantine/core";

export const useGameLayoutStyles = createStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
  },

  topContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
    height: "auto",
    padding: 40,
    paddingTop: 60,
    gap: 20,
  },

  PhotoContainer: {
    position: "relative",
    margin: 0,
    aspectRatio: "8 / 5",
    width: 800,
  },

  summaryContainer: {
    margin: 0,
    width: 430,
    height: 500,
    flexGrow: 1,
  },

  tabBottomContainer: {
    position: "relative",
    width: "100%",
    height: "100%",
  },

  anchor: {
    position: "absolute",
    top: "-4.313rem", // 탭 클릭시 이동하는 위치를 위한 것
  },

  tabContainer: {
    position: "sticky",
    top: "4.313rem",

    width: "100%",
    height: "3rem",
    zIndex: 50,
  },

  bottomContainer: {
    display: "flex",
    flexWrap: "nowrap",
    width: "100%",
    height: "100%",
    padding: 40,
    gap: 40,
  },

  mainContainer_B: {
    flexGrow: 1,
    flexShrink: 0,
    width: 700,
    margin: 0,
  },

  rightContainer_B: {
    position: "sticky",
    top: "9.75rem",

    flexShrink: 0,
    width: "25rem",
    height: "37rem",

    margin: 0,
  },

  mainContainer_S: {
    flexGrow: 1,
    margin: 0,
  },

  rightContainer_S: {
    display: "none",
  },
}));
