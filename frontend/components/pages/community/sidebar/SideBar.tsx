import { Center, Container, Stack } from "@mantine/core";
import { useSideBarStyles } from "./SideBar.styles";
import { Input, Image } from "@mantine/core";
import { Text, TextInput } from "@mantine/core";
import { IconSearch, IconX } from "@tabler/icons-react";
import InvisibleButton from "../../../common/InvisibleButton/InvisibleButton";
import { useState } from "react";

import { useForm } from "@mantine/form";
import { showError } from "../../../../utils/notifications";
export interface SideBarProps {
  onSearchSubmit?: (text: string) => void;
}
export function SideBar({ onSearchSubmit }: SideBarProps) {
  const { classes, cx } = useSideBarStyles();
  const form = useForm({
    initialValues: {
      searchKeyword: "",
    },
  });
  return (
    <Container className={classes.SideBarContainer}>
      <Stack className={classes.Grouping} spacing={"1rem"}>
        <Center className={classes.SideBarName}>
          <Text color="white">검색</Text>
        </Center>
        <form
          // action="http://localhost:3000/community"
          onSubmit={form.onSubmit((values) => {
            if (values.searchKeyword.trim() === "") {
              showError("검색어를 입력해주세요.", "검색 창에 아무 내용도 입력하지 않으셨습니다.");
            }
            onSearchSubmit?.(values.searchKeyword);
          })}
        >
          <TextInput
            {...form.getInputProps("searchKeyword")}
            onSubmit={(event) => {
              alert(event.currentTarget.value);
            }}
            icon={<IconSearch size="1rem" />}
            rightSection={
              <InvisibleButton>
                <IconX onClick={(event) => form.setFieldValue("searchKeyword", "")} />
              </InvisibleButton>
            }
            // value={value} //이거 왜 있는지 모르겠어서 일단 살려둠
            placeholder="검색 부탁드립니다!"
            className={classes.Search}
          />
        </form>
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
