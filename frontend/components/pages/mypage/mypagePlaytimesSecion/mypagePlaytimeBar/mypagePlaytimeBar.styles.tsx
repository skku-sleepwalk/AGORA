import { createStyles } from "@mantine/core";

export const useMypagePlaytimeBarStyles = createStyles((theme) => ({
  listItem: {
    width: "30rem",

    ".mantine-List-itemWrapper": {
      width: "100%",
    },
  },

  line: {
    width: "1.5rem",
    height: "0.4rem",
    borderRadius: theme.radius.xs,
  },

  group: {
    width: "27rem",
  },
}));
