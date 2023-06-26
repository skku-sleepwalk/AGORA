import { Container } from "@mantine/core";
import { useSideBarStyles } from "./SideBar.styles";

export function SideBar() {
  const { classes, cx } = useSideBarStyles();
  return <Container className={classes.SideBarContainer}></Container>;
}
