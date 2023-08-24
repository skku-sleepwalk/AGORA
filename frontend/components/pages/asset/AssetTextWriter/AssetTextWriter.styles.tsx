import { createStyles } from "@mantine/core";

export interface AssetTextWriterStylesProps {
  smallScreen: boolean;
}

export const useAssetTextWriterStyles = createStyles(
  (theme, { smallScreen }: AssetTextWriterStylesProps) => ({
    group: {
      display: "flex",
      flexWrap: "nowrap",

      alignItems: "flex-end",
    },

    editor: {
      flexGrow: 1,
      cursor: "text",

      ".mantine-RichTextEditor-content": {
        fontSize: smallScreen ? theme.fontSizes.xs : theme.fontSizes.sm,
      },
    },

    sendIcon: {
      marginBottom: smallScreen ? "0.3rem" : "0.5rem",
    },
  })
);
