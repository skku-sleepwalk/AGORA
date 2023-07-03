import { createStyles } from "@mantine/core";

export const useRichTextEditorControlGroupStyles = createStyles((theme) => ({
  photoButton: {
    color: "black",
    borderRadius: "0.25rem 0 0 0.25rem",
    border: `1px solid ${theme.colors.gray[4]}`,
    borderRight: "none",
    "&:hover": {
      backgroundColor: theme.colors.gray[0],
    },
    "&:active": {
      transform: "none !important",
    },
  },
}));
