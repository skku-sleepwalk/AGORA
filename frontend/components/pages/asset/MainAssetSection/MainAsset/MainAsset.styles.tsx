import { createStyles, getStylesRef } from "@mantine/core";

export const useMainAssetStyles = createStyles((theme) => ({
  link: {
    textDecoration: "none !important",
    color: theme.black,
  },

  wrapper: {
    width: "10rem",
    height: "16.9rem",
    padding: "0.5rem",

    [`&:hover .${getStylesRef("infoBox")}`]: {
      visibility: "visible",
    },
  },

  infoBox: {
    ref: getStylesRef("infoBox"),

    display: "flex",
    visibility: "hidden",
    width: "100%",
    height: "100%",
    padding: "0.3rem",

    backgroundColor: "rgba(0, 0, 0, 0.35)",
    borderRadius: theme.radius.md,

    alignItems: "center",
    justifyContent: "center",
  },

  saleBox: {
    backgroundColor: theme.colors.pink[1],
    borderRadius: theme.radius.sm,

    color: theme.colors.pink[6],
    fontSize: 12,
    fontWeight: "bold",
  },

  button: {
    display: "flex",
    height: "1.6rem",
    padding: "0rem 0.4rem",

    backgroundColor: "white",
    border: `1px solid ${theme.colors.gray[4]}`,
    borderRadius: theme.radius.md,

    alignItems: "center",
  },

  saleText: {
    color: theme.colors.pink[6],
    fontWeight: "bold",
  },
}));
