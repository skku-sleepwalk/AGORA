import { AppShell as MantineAppShell } from "@mantine/core";
import { ReactNode } from "react";
import { Header } from "./Header/Header";
import { HEADER_LINKS } from "./AppShell.constants";

interface Props {
  children: ReactNode;
}

function AppShell({ children }: Props) {
  return (
    <MantineAppShell
      styles={{ main: { background: "#FCFCFE" } }}
      header={<Header links={HEADER_LINKS} />}
      padding={0}
    >
      {children}
    </MantineAppShell>
  );
}

export default AppShell;
