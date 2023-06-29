import { Center, Container, Stack } from "@mantine/core";
import { useSideBarStyles } from "./SideBar.styles";
import { Input, Image } from "@mantine/core";
import { Text, TextInput } from "@mantine/core";
import { IconSearch, IconX } from "@tabler/icons-react";
import InvisibleButton from "../common/InvisibleButton/InvisibleButton";

export function SideBar() {
  const { classes, cx } = useSideBarStyles();
  return (
    <Container className={classes.SideBarContainer}>
      <Stack className={classes.Grouping} spacing={"1rem"}>
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

        {/* <Input className={classes.Search}></Input> */}

        <TextInput
          icon={<IconSearch size="1rem" />}
          rightSection={
            <InvisibleButton>
              <IconX />
            </InvisibleButton>
          }
          placeholder="Your email"
          className={classes.Search}
        />

        {/* <IconSearch size={"2.5rem"}></IconSearch> */}
      </Stack>

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
