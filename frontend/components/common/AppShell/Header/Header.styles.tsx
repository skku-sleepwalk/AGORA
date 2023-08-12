import { createStyles } from "@mantine/core";

export const useHeaderStyles = createStyles((theme) => ({
  header: {
    width: "100%",
    backgroundColor: theme.colors.teal[4],
    border: "none",
    marginTop: 0,
    boxShadow: "0px 3px 10px rgba(0, 0, 0, 0.2)",
    padding: "0 40px",
  },

  container: {
    height: "100%",
    margin: "0 auto",
  },

  fullHeight: {
    height: "100%",
  },

  linkContainer: {
    height: "100%",
  },

  link: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    lineHeight: 1,
    padding: "8px 12px",
    textDecoration: "none",
    width: 130,
    backgroundColor: "transparent",
    height: "100%",
    color: "white",
    fontSize: 22,

    "&:hover": {
      textDecoration: "none",
      backgroundColor: theme.colors.teal[5],
    },
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.colors.teal[6],
    },
  },

  loginButton: {
    height: 46,
    width: 112,
    backgroundColor: "transparent",
    color: "white",
    fontSize: 18,
    fontWeight: 500,
    border: "1px solid white",
    borderRadius: 15,
    textAlign: "center",
    padding: "0 10px",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.03)",
    },
  },
}));
