import { Center, Container } from "@mantine/core";
import { useSideBarStyles } from "./SideBar.styles";
import { Input } from "@mantine/core";
import { Text } from "@mantine/core";

export function SideBar() {
  const { classes, cx } = useSideBarStyles();
  return (
    <Container className={classes.SideBarContainer}>
      <Container className={classes.Grouping}>
        <Center className={classes.SideBarName}>
          <Text color="white">검색</Text>

          {/* <h4 style={{ textAlign: "center" }}>검색</h4> */}
        </Center>
        <input type="text" placeholder="   검색" className={classes.Search} />
      </Container>
      <br />
      <br />
      <Container className={classes.Grouping}>
        <Center className={classes.SideBarName}>
          <Text color="white">테마</Text>
        </Center>
      </Container>
      <br />
      <br />
      <Container className={classes.Grouping}></Container>
    </Container>
  );
}
