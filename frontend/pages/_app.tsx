import { MantineProvider } from "@mantine/core";
import type { AppProps } from "next/app";
import FontStyle from "../styles/FontStyle";
import { theme } from "../styles/theme";
import AppShell from "../components/common/AppShell/AppShell";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
      <FontStyle />
      <AppShell>
        <Component {...pageProps} />
      </AppShell>
    </MantineProvider>
  );
}

export default MyApp;
