import { createStyles } from "@mantine/core";

export const useSearchBarStyles = createStyles((theme) => ({
  container: {
    height: 46,
  },

  input: {
    height: "100%",
    flexGrow: 1,
    ".mantine-TextInput-wrapper": {
      height: "100%",
      width: "100%",
    },
    ".mantine-TextInput-input": {
      height: "100%",
      borderRadius: "23px 0 0 23px",
      border: `1px solid ${theme.colors.gray[5]}`,
      borderRight: "none",
    },
  },

  searchButton: {
    backgroundColor: theme.colors.gray[2],
    border: `1px solid ${theme.colors.gray[5]}`,
    borderRadius: "0 23px 23px 0",
    width: 76,
    height: "100%",
  },

  searchIcon: {
    position: "relative",
    left: -3,
  },
}));
