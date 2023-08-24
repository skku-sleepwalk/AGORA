import { Box, TextInput, useMantineTheme } from "@mantine/core";
import { useMainSearchBarStyles } from "./MainSearchBar.styles";
import { IconSearch, IconX } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import InvisibleButton from "../../../common/InvisibleButton/InvisibleButton";
import { PostAssetSearchHistory } from "../../../../utils/api/asset/assetSearchHistory";
import useAuth from "../../../../hooks/useAuth";
import { useContext } from "react";
import { AssetContext } from "../../../../pages/asset";

export interface MainSearchBarProps {
  onSubmit: (text: string) => void;
  MovingUp: () => void;
}

export function MainSearchBar({ onSubmit, MovingUp }: MainSearchBarProps) {
  const { classes, cx } = useMainSearchBarStyles();
  const theme = useMantineTheme();

  const { token } = useAuth();

  const { mutateSearchHistory } = useContext(AssetContext);

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
        onSubmit(value.searchKeyword);
        if (value.searchKeyword !== "") {
          PostAssetSearchHistory({ keyword: value.searchKeyword }, token).then(() => {
            form.reset();
            mutateSearchHistory();
            MovingUp();
          });
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
