import { createStyles } from "@mantine/core";

export const useSearchBarStyles = createStyles((theme) => ({
  container: {
    height: "2.875rem",
    paddingLeft: "0.4rem",
    paddingRight: "0.4rem",
    paddingTop: "0.4rem",
    paddingBottom: "0.4rem",
  },

  group: {
    height: "100%",
  },

  input: {
    height: "100%",
    flexGrow: 1,
    ".mantine-TextInput-wrapper": {
      height: "100%",
      width: "100%",
      borderRadius: 15,
      backgroundColor: "#F3F3F3",
    },
    ".mantine-TextInput-input": {
      height: "100%",
      border: "none",
      backgroundColor: "transparent",
    },
  },

  searchButton: {
    borderRadius: 15,
    width: 76,
    height: "100%",
  },
}));
