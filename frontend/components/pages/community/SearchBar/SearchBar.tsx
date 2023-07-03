import { Center, Group, TextInput, UnstyledButton } from "@mantine/core";
import { useSearchBarStyles } from "./SearchBar.styles";
import { IconSearch } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import { init } from "next/dist/compiled/@vercel/og/satori";

export interface SearchBarProps {
  className?: string;
  onSubmit?: (text: string) => void;
}

function SearchBar({ className, onSubmit }: SearchBarProps) {
  const { classes, cx } = useSearchBarStyles();
  const form = useForm({
    initialValues: {
      searchKeyword: "",
    },
  });

  return (
    <form
      onSubmit={form.onSubmit((values) => {
        onSubmit?.(values.searchKeyword);
      })}
    >
      <Group spacing={0} className={cx(classes.container, className)}>
        <TextInput
          placeholder="검색어를 입력해주세요."
          className={classes.input}
          {...form.getInputProps("searchKeyword")}
        />
        <UnstyledButton variant="transparent" className={classes.searchButton} type="submit">
          <Center>
            <IconSearch className={classes.searchIcon} />
          </Center>
        </UnstyledButton>
      </Group>
    </form>
  );
}

export default SearchBar;
