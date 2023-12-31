import { createStyles } from "@mantine/core";

export const usePostDetailViewerStyles = createStyles((theme) => ({
  postContainer: {
    width: 800,
    padding: 41,
  },

  content: {
    lineHeight: 1.5,
    padding: 0,
    "*": {
      marginBottom: "0px !important",
    },
  },

  editorContainer: {
    width: 718,
    padding: "19px 0px 0px 0px",
  },

  editButton: {
    ".mantine-Button-label": {
      fontWeight: "normal",
    },
  },

  cancelButton: {
    border: `1px solid ${theme.colors.gray[6]}`,
  },

  multiSelect: {
    marginTop: 10,

    ".mantine-MultiSelect-values": {
      backgroundColor: "transparent",
    },
    ".mantine-MultiSelect-input": {
      padding: 0,
      border: "none",
      backgroundColor: "transparent",
    },
  },
}));
