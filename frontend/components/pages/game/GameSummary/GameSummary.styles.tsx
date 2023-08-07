import { createStyles } from "@mantine/core";

export const useGameSummaryStyles = createStyles((theme) => ({
  modal: {
    display: "flex",
    width: "21.875rem",

    ".mantine-Modal-title": {
      marginLeft: "0.1rem",
      fontSize: "1.2rem",
    },
  },

  stack: {
    cursor: "default",
  },

  heartFilled: {
    marginRight: "0.2rem",
  },

  alignTop: {
    alignItems: "flex-start",
  },

  alignBottom: {
    alignItems: "flex-end",
  },

  grayText: {
    marginLeft: "0.5rem",
    color: theme.colors.gray[6],
  },

  blueText: {
    position: "absolute",
    marginLeft: "6.5rem",
    color: theme.colors.blue[4],
    textDecoration: "underLine",
    "&:hover": {
      color: theme.colors.blue[4],
      textDecoration: "underLine",
    },
  },

  followBadge: {
    width: "6rem",
    height: "2rem",
    padding: "0rem 0.3rem",

    ".mantine-Badge-leftSection": {
      marginRight: "0.7rem",
    },
  },

  tagGroup: {
    maxHeight: "4.3rem",
    overflow: "hidden",
  },

  tagBox: {
    position: "relative",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    height: "4.3rem",
    margin: "0rem 0.1875rem",
    padding: 0,
    backgroundColor: "#fcfcfe",

    "&::after": {
      content: '""',
      flexGrow: 100,
      height: "1.988rem",
    },
  },

  tag: {
    display: "flex",
    flexGrow: 1,

    height: "1.8rem",
    margin: "0.1875rem 0.3125rem",
    paddingLeft: "0.5rem",
    paddingRight: "0.75rem",
    borderRadius: "0.25rem",

    justifyContent: "center",
    alignItems: "center",

    backgroundColor: theme.colors.blue[1],
    color: theme.colors.blue[6],
    fontSize: 12,
    fontWeight: "bold",
  },

  addButton: {
    display: "flex",

    height: "1.8rem",
    margin: "0.1875rem 0.3125rem",
    paddingLeft: "0.5rem",
    paddingRight: "0.5rem",

    justifyContent: "center",
    alignItems: "center",

    backgroundColor: theme.colors.blue[1],
    color: theme.colors.blue[6],
    fontSize: 16,

    "&:hover": {
      backgroundColor: theme.colors.blue[2],
    },
  },

  addButton_A: {
    position: "absolute",
    top: "2.175rem",
    right: "0rem",
    boxShadow: "-7px 0px 4px #fcfcfe",
  },

  marginTop: {
    marginTop: "0.44rem",
  },

  marginBottom: {
    marginBottom: "0.44rem",
  },

  marginLeft: {
    marginLeft: "0.5rem",
    marginRight: "0.5rem",
  },

  sellButton: {
    // width: "17rem",
    width: "8rem",
    height: "4.7rem",
    flexGrow: 1,
  },

  passButton: {
    width: "7rem",
    height: "4.7rem",
  },
}));
