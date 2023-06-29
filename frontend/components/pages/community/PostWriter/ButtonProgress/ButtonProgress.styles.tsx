import { createStyles } from "@mantine/core";

export const useButtonProgressStyles = createStyles((theme) => ({
  button: {
    position: "relative",
    transition: "background-color 150ms ease",
    width: 120,
  },

  progress: {
    ...theme.fn.cover(-1),
    height: "auto",
    backgroundColor: "transparent",
    zIndex: 0,
  },

  label: {
    position: "relative",
    zIndex: 1,
  },
}));
