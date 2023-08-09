import { createStyles } from "@mantine/core";

export const useMovingUpButtonStyles = createStyles((theme) => ({
  button: {
    display: "flex",
    width: "3rem",
    height: "3rem",

    backgroundColor: theme.colors.gray[2],
    borderRadius: "50%",

    alignItems: "center",
    justifyContent: "center",
  },

  displayNone: {
    display: "none",
  },
}));
