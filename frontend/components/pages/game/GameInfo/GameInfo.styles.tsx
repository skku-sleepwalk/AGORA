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

  multiSelect: {
    maxWidth: "24rem",
    maxHeight: "2.25rem",
    overflow: "hidden",

    ".mantine-MultiSelect-input": {
      border: "none",
      padding: 0,
    },
    ".mantine-MultiSelect-value": {
      height: "1.8rem",
      backgroundColor: theme.colors.blue[1],
      color: theme.colors.blue[6],
      fontWeight: "bold",
    },
  },

  addButton: {
    height: "1.8rem",
    padding: "0px 8px",
    backgroundColor: theme.colors.blue[1],
    color: theme.colors.blue[6],
    fontSize: "1.2rem",

    "&:hover": {
      backgroundColor: theme.colors.blue[2],
    },
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
