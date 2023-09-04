import { createStyles } from "@mantine/core";

export const useGamePlayModalStyles = createStyles((theme) => ({
  marginTop: {
    marginTop: "1rem",
  },
  marginSide: {
    marginLeft: "0.5rem",
    marginRight: "0.5rem",
  },

  priceButton: {
    display: "flex",
    width: "auto",
    height: "1.5rem",

    backgroundColor: theme.colors.teal[4],
    fontWeight: "normal",

    alignItems: "center",

    "&:hover": {
      backgroundColor: theme.colors.teal[5],
    },
  },

  passButton: {
    width: "8rem",
    height: "3rem",

    backgroundColor: "white",
    flexGrow: 1,

    "&:hover": {
      backgroundColor: theme.colors.gray[0],
    },
  },

  sellButton: {
    width: "8rem",
    height: "3rem",

    backgroundColor: theme.colors.teal[4],
    flexGrow: 1,

    "&:hover": {
      backgroundColor: theme.colors.teal[5],
    },
  },
}));
