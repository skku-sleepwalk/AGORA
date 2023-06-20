import { MantineTheme, MantineThemeOverride } from "@mantine/core";

// Default theme: https://github.com/mantinedev/mantine/blob/master/src/mantine-styles/src/theme/default-theme.ts
export const theme: MantineThemeOverride = {
  colorScheme: "light",
  fontFamily: "GyeonggiTitleM, Pretendard, sans-serif",
  black: "#333",
  headings: {
    fontFamily: "inherit",
  },

  other: {
    fontWeights: {
      regular: 400,
      bold: 700,
    },
  },
  lineHeight: 1,
  globalStyles: (theme: MantineTheme) => ({
    body: {
      ...theme.fn.fontStyles(),
      margin: 0,
    },

    a: {
      color: theme.colors.blue[5],
      textDecoration: "none",

      "&:hover": {
        textDecoration: "underline",
      },
    },
  }),

  colors: {
    teal: [
      "#D8EFF6",
      "#BDE3EE",
      "#A4D6E5",
      "#8BC9DC",
      "#72BCD2",
      "#5BAEC7",
      "#4E99B0",
      "#418498",
      "#356F80",
      "#2A5967",
    ],
  },

  // Mantine 컴포넌트들의 스타일을 변경할 수 있음
  components: {},
};
