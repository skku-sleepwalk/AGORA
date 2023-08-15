import { createStyles } from "@mantine/core";

export const useMainLayoutStyles = createStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
    height: "100%",
  },

  searchcontainer: {
    position: "sticky",
    top: "4.313rem",

    width: "100%",
    height: "4rem",
    zIndex: 50,
  },

  searchRecordContainer: {
    boxSizing: "border-box",
    width: "100%",
    height: "4rem",
    paddingTop: "0.2rem",
  },

  tabContainer: {
    position: "sticky",
    top: "8.313rem",

    width: "100%",
    height: "2.5rem",
    zIndex: 50,
  },

  mainContainer: {
    width: "100%",
    minHeight: "calc(100vh - 14.813rem)",
    padding: "2rem 0rem",
  },

  movingUpButtonContainer: {
    position: "fixed",
    right: "1rem",
    bottom: "1rem",
    width: "3rem",
    height: "3rem",
  },
}));
