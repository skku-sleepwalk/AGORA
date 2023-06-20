import { MantineProvider } from "@mantine/core";
import type { AppProps } from "next/app";
import FontStyle from "../styles/FontStyle";
import { theme } from "../styles/theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
      <FontStyle />
      <Component {...pageProps} />
    </MantineProvider>
  );
}

export default MyApp;
