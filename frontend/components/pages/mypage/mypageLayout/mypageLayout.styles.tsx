import { createStyles } from "@mantine/core";

export const useMypageLayoutStyles = createStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
  },

  userInfoContainer: {
    width: "100%",
    aspectRatio: "45 / 8",
    height: "auto",
  },

  tabBottomContainer: {
    position: "relative",
    width: "100%",
    height: "100%",
  },

  anchor: {
    position: "absolute",
    top: "-4.2rem", // 탭 클릭시 이동하는 위치를 위한 것
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

  mainContainer: {
    display: "flex",
    flexGrow: 1,
    width: 700,
    margin: 0,

    justifyContent: "center",
  },
}));
