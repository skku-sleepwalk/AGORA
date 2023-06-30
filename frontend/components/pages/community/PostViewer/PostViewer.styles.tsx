import { createStyles } from "@mantine/core";

export interface PostViewerStyles {
  maxContentHeight: number;
}

export const usePostViewerStyles = createStyles(
  (theme, { maxContentHeight }: PostViewerStyles) => ({
    postContainer: {
      width: 616,
      padding: 25,
    },

    contentWrapper: {
      position: "relative",
      overflow: "hidden",
      maxHeight: maxContentHeight,
      borderBottom: "none",
      width: "100%",
      padding: 0,
      "&::after": {
        content: '""',
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100%",
        height: "2em",
        background:
          "linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1) 100%)",
      },
    },

    content: {
      lineHeight: 1.5,
      maxHeight: maxContentHeight,
      overflow: "hidden",
      borderBottom: "none",
    },

    thumbnail: {
      background: theme.colors.gray[8],
      borderRadius: 15,
      maxWidth: "100%",
      overflow: "hidden",
    },

    modal: {
      ".mantine-Modal-body": {
        padding: 0,
      },
      ".mantine-Modal-header": {
        display: "none",
      },
      "	.mantine-Modal-content": {
        borderRadius: 15,
      },
    },
  })
);