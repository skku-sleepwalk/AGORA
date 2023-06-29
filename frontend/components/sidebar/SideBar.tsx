import { Center, Container } from "@mantine/core";
import { useSideBarStyles } from "./SideBar.styles";
import { Input, Image } from "@mantine/core";
import { Text } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

export function SideBar() {
  const { classes, cx } = useSideBarStyles();
  return (
    <Container className={classes.SideBarContainer}>
      <Container className={classes.Grouping}>
        <Center className={classes.SideBarName}>
          <Text color="white">검색</Text>

          {/* <h4 style={{ textAlign: "center" }}>검색</h4> */}
        </Center>
        {/* <input
          // src="Union.png"
          type="search"
          className={classes.Search}
          // style={{
          //   backgroundImage:
          //     "url(https://cdn1.iconfinder.com/data/icons/hawcons/32/698627-icon-111-search-256.png)",
          // }}
        /> */}
        <Input className={classes.Search}></Input>
        {/* <Image maw={240} mx="auto" radius="md" src="./aaa.jpg" alt="Random image" /> */}
        {/* <IconSearch size={"2.5rem"}></IconSearch> */}
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
