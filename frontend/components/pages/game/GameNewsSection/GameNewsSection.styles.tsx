import { createStyles } from "@mantine/core";

export const useGameNewsSectionStyles = createStyles((theme) => ({
  displayNone: {
    display: "none",
  },

  button: {
    borderRadius: theme.radius.md,
    transition: "background-color 0.2s ease-in",
    "&:hover": {
      backgroundColor: theme.colors.blue[1],
    },
  },

  Icon: {
    transition: "transform 0.2s ease-in",
  },

  rotate: {
    transform: `rotate(45deg)`,
    transition: "transform 0.2s ease-in",
  },

  marginTop: {
    marginTop: "3rem",
  },
}));
