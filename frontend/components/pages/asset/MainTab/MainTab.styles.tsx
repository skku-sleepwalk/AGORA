import { createStyles } from "@mantine/core";

export const useMainTabStyles = createStyles((theme) => ({
  wrapper: {
    display: "flex",
    width: "100%",
    height: "100%",
    paddingBottom: "0.375rem",

    backgroundColor: "#fcfcfe",
    justifyContent: "center",
    transition: "box-shadow 0.5s ease-in",
  },

  shadow: {
    boxShadow: `0px 6px 7px rgba(0, 0, 0, 0.1)`,
    transition: "0.5s ease-in",
  },

  group: {
    width: "80%",
    height: "100%",
  },

  buttonOn: {
    backgroundColor: theme.colors.teal[4],
    border: "none",
    color: "white",

    "&:hover": {
      backgroundColor: theme.colors.teal[5],
    },
  },
}));
