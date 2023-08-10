import { createStyles } from "@mantine/core";

export const useMainSearchBarStyles = createStyles((theme) => ({
  wrapper: {
    display: "flex",
    width: "100%",
    height: "4rem",

    backgroundColor: "#fcfcfe",

    alignItems: "center",
    justifyContent: "center",
  },

  group: {
    display: "flex",
    flexWrap: "nowrap",
    boxSizing: "border-box",

    width: "80%",
    padding: "0.2rem 0.8rem",

    borderRadius: theme.radius.sm,
    backgroundColor: theme.colors.gray[2],

    alignItems: "center",
    gap: "0.2rem",
  },

  textInput: {
    flexGrow: 1,

    ".mantine-TextInput-input": {
      border: "none",
      backgroundColor: "transparent",
    },
  },
}));
