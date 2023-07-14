import { createStyles } from "@mantine/core";

export const usePostDetailViewerStyles = createStyles((theme) => ({
  postContainer: {
    width: 800,
    padding: 41,
  },

  content: {
    lineHeight: 1.5,
    padding: 0,
  },

  editorContainer: {
    width: 718,
    padding: "19px 0px 0px 0px",
  },

  editButton: {
    ".mantine-Button-label": {
      fontWeight: "normal",
    },
  }
}));
