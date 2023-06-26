import { Container } from "@mantine/core";
import { useSideBarStyles } from "./SideBar.styles";
import { Group } from "@mantine/core";

export function SideBar() {
  const { classes, cx } = useSideBarStyles();
  return (
    <Container className={classes.SideBarContainer}>
      <Container className={classes.Grouping}>
        <Container className={classes.SideBarName}>검색</Container>
      </Container>
      <br />
      <br />
      <Container className={classes.Grouping}>
        <Container className={classes.SideBarName}>테마</Container>
      </Container>
      <br />
      <br />
      <Container className={classes.Grouping}>
        <Container className={classes.SideBarName}>카테고리</Container>
      </Container>
    </Container>
  );
}
