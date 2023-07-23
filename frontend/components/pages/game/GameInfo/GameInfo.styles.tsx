import { createStyles } from "@mantine/core";

export const useGameInfoStyles = createStyles((theme) => ({
  stack: {
    cursor: "default",
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
  },

  tagBox: {
    display: "flex",
    flexWrap: "wrap",

    height: "4.3rem",
    margin: "0rem 0.1875rem",
    padding: 0,
    backgroundColor: "#fcfcfe",
  },

  tag: {
    display: "flex",

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

  marginTop: {
    marginTop: "0.65rem",
  },

  marginBottom: {
    marginBottom: "0.65rem",
  },

  marginLeft: {
    marginLeft: "0.5rem",
    marginRight: "0.5rem",
  },

  sellButton: {
    width: "17rem",
    height: "4.7rem",
    flexGrow: 1,
  },

  passButton: {
    width: "7rem",
    height: "4.7rem",
  },
}));
