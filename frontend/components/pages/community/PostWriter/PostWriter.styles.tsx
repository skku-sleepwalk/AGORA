import { TextInput, createStyles } from "@mantine/core";

export const useWriteWritingStyles = createStyles((theme) => ({
  container: {
    height: 74,
    display: "flex",
    overflow: "hidden",
    alignItems: "center",
    padding: "14px 18px",
    gap: 19,
  },

  TextInput: {
    float: "left",
    flex: 1,
  },
  erase: {
    display: "none",
  },
  avatarInWriting: {
    border: `1px solid ${theme.colors.gray[2]}`,
  },

  editorModal: {
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

  editorContainer: {
    width: 800,
    padding: 19,
  },
}));
