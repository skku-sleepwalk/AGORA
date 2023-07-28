import { createStyles } from "@mantine/core";

export const useGameInfoStyles = createStyles((theme) => ({
  infoSection: {
    width: "100%",
    height: "100%",
    padding: "2rem 1.5rem",
  },

  infoTypo: {
    lineHeight: 1.2,
  },

  content: {
    lineHeight: 1.5,

    "*": {
      marginBottom: "0px !important",
    },
  },

  marginTop: {
    marginTop: "3rem",
  },
}));
