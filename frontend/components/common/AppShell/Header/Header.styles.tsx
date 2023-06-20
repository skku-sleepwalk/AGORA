import { createStyles, rem } from "@mantine/core";

export const useHeaderStyles = createStyles((theme) => ({
  header: {
    width: "100%",
  },

  container: {
    height: "100%",
    maxWidth: 1300,
    margin: "0 auto",
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: "8px 12px",
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color: theme.colors.gray[7],
    fontWeight: 500,

    "&:hover": {
      textDecoration: "none",
      backgroundColor: theme.colors.gray[0],
    },
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({ variant: "light", color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor }).color,
    },
  },
}));
