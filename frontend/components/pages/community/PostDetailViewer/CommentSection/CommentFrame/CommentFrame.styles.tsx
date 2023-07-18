import { createStyles } from "@mantine/core";

export interface CommentFrameStyles {
  withoutLeftBorder?: boolean;
}

export const useCommentFrameStyles = createStyles(
  (theme, { withoutLeftBorder }: CommentFrameStyles) => ({
    commentFrame: {
      position: "relative",
    },

    avatar: {
      position: "absolute",
      top: 1,
      left: 6,
    },

    commentWrapper: {
      marginLeft: 23,
      paddingLeft: 14,
      paddingTop: 9,
      marginTop: 0,
      marginRight: 0,
      paddingRight: 0,
      borderLeft: withoutLeftBorder ? "none" : `2px solid ${theme.colors.gray[3]}`,
      width: "100%",
    },

    commentContainer: {
      margin: 0,
      paddingLeft: withoutLeftBorder ? 10 : 8,
    },

    date: {
      paddingBottom: "0.3rem",
    },

    userName: {
      marginBottom: 6,
    },
  })
);
