import { createStyles } from "@mantine/core";

export const useMypageUserInfoStyles = createStyles((theme) => ({
  box: {
    width: "100%",
    height: "100%",
  },

  backgroundImage: {
    display: "flex",
    alignItems: "center",
  },

  group: {
    marginLeft: "3.5rem",
    gap: "1.5rem",

    [theme.fn.smallerThan(1000)]: {
      marginLeft: "2.9rem",
      gap: "1.25rem",
    },

    [theme.fn.smallerThan(820)]: {
      marginLeft: "2.3rem",
      gap: "1rem",
    },

    [theme.fn.smallerThan(720)]: {
      marginLeft: "1.53rem",
      gap: "0.7rem",
    },

    [theme.fn.smallerThan(540)]: {
      marginLeft: "1.15rem",
      gap: "0.5rem",
    },
  },

  avatar: {
    width: "9rem",
    height: "9rem",

    [theme.fn.smallerThan(1000)]: {
      width: "7.5rem",
      height: "7.5rem",
    },

    [theme.fn.smallerThan(820)]: {
      width: "6rem",
      height: "6rem",
    },

    [theme.fn.smallerThan(720)]: {
      width: "4rem",
      height: "4rem",
    },

    [theme.fn.smallerThan(540)]: {
      width: "3rem",
      height: "3rem",
    },
  },

  username: {
    fontSize: "2.5rem",

    [theme.fn.smallerThan(1000)]: {
      fontSize: "2rem",
    },

    [theme.fn.smallerThan(820)]: {
      fontSize: "1.6rem",
    },

    [theme.fn.smallerThan(720)]: {
      fontSize: "1rem",
    },

    [theme.fn.smallerThan(540)]: {
      fontSize: "0.8rem",
    },
  },

  userinfo: {
    fontSize: "1.4rem",

    [theme.fn.smallerThan(1000)]: {
      fontSize: "1.16rem",
    },

    [theme.fn.smallerThan(820)]: {
      fontSize: "0.9rem",
    },

    [theme.fn.smallerThan(720)]: {
      fontSize: "0.6rem",
    },

    [theme.fn.smallerThan(820)]: {
      fontSize: "0.45rem",
    },
  },
}));
