import { createStyles } from "@mantine/core";

export const useLoginFormStyles = createStyles((theme) => ({
  container: {
    width: 450,
    borderRadius: 30,
    padding: "23px 28px",
  },

  textInput: {
    ".mantine-TextInput-input": {
      height: 50,
      backgroundColor: theme.colors.gray[2],
      border: "none",
    },
  },

  submitButton: {
    height: 40,
    backgroundColor: theme.colors.teal[5],
    color: "white",
    "&:hover": {
      backgroundColor: theme.colors.teal[6],
    },
    fontSize: 18,
    fontWeight: 500,
  },
}));
