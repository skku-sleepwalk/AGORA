import { createStyles } from "@mantine/core";

export const useGameTagModalStyles = createStyles((theme) => ({
  multiSelectBox: {
    width: "100%",
    height: "18.75rem",
    padding: "0.5rem",
    border: `1px solid ${theme.colors.gray[4]}`,
    borderRadius: theme.radius.sm,

    overflow: "hidden",
  },

  searchGroup: {
    display: "flex",
    margin: "0rem 0.3125rem",
    gap: "0.5rem",
  },

  search: {
    flexGrow: 1,
    border: `0.0625rem solid ${theme.colors.gray[4]}`,
    borderRadius: theme.radius.sm,

    ".mantine-TextInput-input": {
      backgroundColor: "transparent",
      border: "none",
    },
  },

  tagBox: {
    display: "flex",
    flexWrap: "wrap",

    width: "100%",
    height: "100%",
    padding: 0,
    margin: 0,

    alignContent: "flex-start",
  },

  selectedGroup: {
    alignItems: "flex-end",
  },

  selectedBox: {
    display: "flex",
    flexWrap: "wrap",

    width: "20rem",
    minHeight: "2.5rem",
    maxHeight: "4.7rem",
    padding: "0.1rem 0.5rem",
    border: `1px solid ${theme.colors.gray[4]}`,
    borderRadius: theme.radius.sm,
    flexGrow: 1,

    overflow: "hidden",

    alignContent: "flex-start",
  },

  selectedTag: {
    display: "flex",
    flexGrow: 1,

    height: "1.8rem",
    margin: "0.1875rem 0.3125rem",
    paddingLeft: "0.5rem",
    paddingRight: "0.3rem",
    borderRadius: "0.25rem",

    justifyContent: "center",
    alignItems: "center",

    backgroundColor: theme.colors.blue[1],
    color: theme.colors.blue[6],
    fontSize: 12,
    fontWeight: "bold",
  },

  tagButton: {
    display: "flex",
    flexGrow: 1,

    height: "1.8rem",
    margin: "0.1875rem 0.3125rem",
    paddingLeft: "0.5rem",
    paddingRight: "0.5rem",

    justifyContent: "center",
    alignItems: "center",

    border: `1px solid ${theme.colors.gray[4]}`,
    backgroundColor: "white",
    color: theme.colors.gray[6],
    fontSize: 12,

    "&:hover": {
      backgroundColor: theme.colors.gray[2],
    },
  },

  tagButtonChecked: {
    border: `1px solid ${theme.colors.blue[1]} !important`,
    backgroundColor: theme.colors.blue[1],
    color: theme.colors.blue[6],
    fontSize: 12,

    "&:hover": {
      border: `1px solid ${theme.colors.blue[2]}`,
      backgroundColor: theme.colors.blue[2],
    },
  },
}));
