import { createStyles } from "@mantine/core";

export const useInvisibleButtonStyles = createStyles((theme) => ({
  button: {
    border: "none",
    backgroundColor: "transparent",
    cursor: "pointer",
    padding: 0,
    margin: 0,
    "&:active": {
      transform: "translateY(1px)",
    },
  },
}));
