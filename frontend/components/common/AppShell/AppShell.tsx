import { AppShell as MantineAppShell, useMantineTheme } from "@mantine/core";
import { ReactNode } from "react";
import { Header } from "./Header/Header";
import { HEADER_LINKS } from "./AppShell.constants";

interface Props {
  children: ReactNode;
}

function AppShell({ children }: Props) {
  const theme = useMantineTheme();

  return (
    <MantineAppShell
      styles={{ main: { background: "#FCFCFE" } }}
      header={<Header links={HEADER_LINKS} />}
    >
      {children}
    </MantineAppShell>
  );
}

export default AppShell;
