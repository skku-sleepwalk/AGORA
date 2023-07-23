import { createStyles } from "@mantine/core";

export const useGameTagModalStyles = createStyles((theme) => ({
  multiSelect: {
    ".mantine-MultiSelect-item": {
      margin: "0.1rem 0rem",
      "&:hover": {
        // backgroundColor: theme.colors.blue[3],
      },
      "&[data-active]": {
        backgroundColor: theme.colors.blue[3],
      },
    },
  },
}));
