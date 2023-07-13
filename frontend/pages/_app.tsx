import { MantineProvider } from "@mantine/core";
import type { AppProps } from "next/app";
import FontStyle from "../styles/FontStyle";
import { theme } from "../styles/theme";
import AppShell from "../components/common/AppShell/AppShell";
import { Notifications } from "@mantine/notifications";
import { SWRConfig } from "swr";
import { fetcher } from "../utils/fetcher";
import AuthProvider from "../components/common/AuthProvider/AuthProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
      <SWRConfig
        value={{
          fetcher: fetcher,
        }}
      >
        <AuthProvider>
          <FontStyle />
          <Notifications />
          <AppShell>
            <Component {...pageProps} />
          </AppShell>
        </AuthProvider>
      </SWRConfig>
    </MantineProvider>
  );
}

export default MyApp;
