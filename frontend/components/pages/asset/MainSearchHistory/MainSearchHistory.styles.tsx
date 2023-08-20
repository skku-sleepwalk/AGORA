import { createStyles } from "@mantine/core";

export const useMainSearchHistoryStyles = createStyles((theme) => ({
  wrapper: {
    display: "flex",
    width: "100%",
    height: "1.5rem",

    alignItems: "center",
    justifyContent: "center",
  },

  group: {
    boxSizing: "border-box",
    width: "78%",

    fontSize: 14,
    alignItems: "center",
  },

  text: {
    marginRight: "0.2rem",
  },

  badge: {
    padding: "0.3rem 0.5rem",
    backgroundColor: theme.colors.teal[4],
    borderRadius: theme.radius.sm,

    color: "white",
    fontSize: 14,
  },

  badgeBg: {
    backgroundColor: `${theme.colors.teal[2]} !important`,
  },
}));
