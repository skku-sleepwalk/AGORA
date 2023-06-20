import { Global } from "@mantine/core";

function FontStyle() {
  return (
    <Global
      styles={[
        {
          "@font-face": {
            fontFamily: "Pretendard",
            src: `url('/fonts/Pretendard-Regular.woff2') format("woff2")`,
            fontWeight: 400,
            fontStyle: "normal",
          },
        },
        {
          "@font-face": {
            fontFamily: "Pretendard",
            src: `url('/fonts/Pretendard-Bold.woff2') format("woff2")`,
            fontWeight: 700,
            fontStyle: "normal",
          },
        },
        {
          "@font-face": {
            fontFamily: "Pretendard",
            src: `url('/fonts/Pretendard-Black.woff2') format("woff2")`,
            fontWeight: 900,
            fontStyle: "normal",
          },
        },
      ]}
    />
  );
}

export default FontStyle;
