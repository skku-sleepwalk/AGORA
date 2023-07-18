import { Badge, Container, Divider, Group, Stack } from "@mantine/core";
import { useRightSidebarStyles } from "./RightSidebar.styles";
import { TextInput } from "@mantine/core";
import {
  IconBookmarks,
  IconFlame,
  IconRotateClockwise,
  IconSearch,
  IconUserEdit,
  IconX,
} from "@tabler/icons-react";
import InvisibleButton from "../../../common/InvisibleButton/InvisibleButton";
import { useForm } from "@mantine/form";
import { showError } from "../../../../utils/notifications";
import { useRouter } from "next/router";

export interface RightSidebarProps {
  onSearchSubmit?: (text: string) => void;
}
export function RightSidebar({ onSearchSubmit }: RightSidebarProps) {
  const { classes, cx } = useRightSidebarStyles();
  const form = useForm({
    initialValues: {
      searchKeyword: "",
    },
  });
  const router = useRouter();

  return (
    <Container className={classes.SideBarContainer}>
      <Stack spacing={"sm"}>
        <form
          onSubmit={form.onSubmit((values) => {
            if (values.searchKeyword.trim() === "") {
              showError("검색어를 입력해주세요.", null);
            }
            onSearchSubmit?.(values.searchKeyword);
            router.replace(`http://localhost:3000/community?search=${values.searchKeyword}`);
          })}
        >
          <TextInput
            {...form.getInputProps("searchKeyword")}
            onSubmit={(event) => {
              alert(event.currentTarget.value);
            }}
            icon={<IconSearch size="1rem" color="black" />}
            rightSection={
              <InvisibleButton>
                <IconX
                  onClick={(event) => form.setFieldValue("searchKeyword", "")}
                  size={"1rem"}
                  stroke={"0.15rem"}
                  color="#bdc3cd"
                />
              </InvisibleButton>
            }
            placeholder="원하는 글을 검색해보세요."
            className={classes.Search}
          />
        </form>
        <Divider color="#F3F3F3" />
        <Group position="apart">
          <InvisibleButton className={classes.QuickIconButton}>
            <Badge
              className={classes.QuickIcon}
              leftSection={<IconUserEdit color="black" stroke={"0.1rem"} />}
            >
              내 글
            </Badge>
          </InvisibleButton>
          <InvisibleButton className={classes.QuickIconButton}>
            <Badge
              className={classes.QuickIcon}
              leftSection={<IconBookmarks color="black" stroke={"0.1rem"} />}
            >
              북마크
            </Badge>
          </InvisibleButton>
        </Group>
        <Group position="apart">
          <InvisibleButton className={classes.QuickIconButton}>
            <Badge
              className={classes.QuickIcon}
              leftSection={<IconFlame color="black" stroke={"0.1rem"} />}
            >
              인기글
            </Badge>
          </InvisibleButton>
          <InvisibleButton className={classes.QuickIconButton}>
            <Badge
              className={classes.QuickIcon}
              leftSection={<IconRotateClockwise color="black" stroke={"0.1rem"} />}
            >
              최신글
            </Badge>
          </InvisibleButton>
        </Group>
        <Divider color="#F3F3F3" />
      </Stack>
    </Container>
  );
}
