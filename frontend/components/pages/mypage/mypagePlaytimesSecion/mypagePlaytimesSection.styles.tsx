import { createStyles } from "@mantine/core";

export const useMypagePlaytimesSectionStyles = createStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",

    justifyContent: "space-between",
  },

  stack: {
    flexGrow: 1,
    padding: "2rem 0rem",
  },

  ringProcess: {},

  playtimeBar: {
    paddingLeft: "2rem",
    paddingTop: "1.5rem",
  },

  totalPlaytimeText: {
    paddingLeft: "2rem",
  },
}));
