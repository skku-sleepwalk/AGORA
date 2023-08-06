import { createStyles } from "@mantine/core";

export interface GameTextWriterStylesProps {
  smallScreen: boolean;
}

export const useGameTextWriterStyles = createStyles(
  (theme, { smallScreen }: GameTextWriterStylesProps) => ({
    group: {
      display: "flex",
      flexWrap: "nowrap",

      alignItems: "flex-end",
    },

    editor: {
      flexGrow: 1,
      ".mantine-RichTextEditor-content": {
        fontSize: smallScreen ? theme.fontSizes.xs : theme.fontSizes.sm,
      },
    },

    sendIcon: {
      marginBottom: smallScreen ? "0.3rem" : "0.5rem",
    },
  })
);
