import { Box, TextInput, useMantineTheme } from "@mantine/core";
import { useMainSearchBarStyles } from "./MainSearchBar.styles";
import { IconSearch, IconX } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import InvisibleButton from "../../../common/InvisibleButton/InvisibleButton";
import { showError } from "../../../../utils/notifications";

export interface MainSearchBarProps {
  MovingUp: () => void;
}

export function MainSearchBar({ MovingUp }: MainSearchBarProps) {
  const { classes, cx } = useMainSearchBarStyles();
  const theme = useMantineTheme();

  // 검색 받아오는 것 관련
  const form = useForm({
    initialValues: {
      searchKeyword: "",
    },
  });

  return (
    <form
      className={classes.wrapper}
      onSubmit={form.onSubmit((value) => {
        if (value.searchKeyword.trim() === "") {
          showError("검색어를 입력해주세요.", "검색 창에 아무 내용도 입력하지 않으셨습니다.");
        } else {
          console.log(value);
          MovingUp();
        }
      })}
      onReset={form.onReset}
    >
      <Box className={classes.group}>
        <IconSearch stroke={1.5} />
        <TextInput
          className={classes.textInput}
          placeholder="원하는 에셋을 검색해 보세요."
          onSubmit={() => {}} // 엔터를 칠 때 submit 발생
          {...form.getInputProps("searchKeyword")}
          rightSection={
            <InvisibleButton type="reset">
              <IconX size={"1.2rem"} stroke={1.2} color={theme.colors.gray[6]} />
            </InvisibleButton>
          }
        />
      </Box>
    </form>
  );
}
