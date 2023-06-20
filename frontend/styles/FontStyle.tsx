import { Global } from "@mantine/core";

function FontStyle() {
  return (
    <Global
      styles={{
        "@font-face": {
          fontFamily: "GyeonggiTitleM",
          src: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_one@1.0/GyeonggiTitleM.woff') format('woff')`,
          fontWeight: "normal",
          fontStyle: "normal",
        },
      }}
    />
  );
}

export default FontStyle;
