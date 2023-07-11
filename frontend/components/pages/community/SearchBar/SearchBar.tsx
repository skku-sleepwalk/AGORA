import { Center, Group, TextInput, UnstyledButton } from "@mantine/core";
import { useSearchBarStyles } from "./SearchBar.styles";
import { IconSearch } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export interface SearchBarProps {
  className?: string;
  onSubmit?: (text: string) => void;
  defaultValue?: string;
}

function SearchBar({ className, onSubmit, defaultValue }: SearchBarProps) {
  const { classes, cx } = useSearchBarStyles();
  const [search, setSearch] = useState(defaultValue ?? "");
  const router = useRouter();
  const searchQuery = router.query.search;

  useEffect(() => {
    setSearch(searchQuery?.toString() ?? "");
  }, [searchQuery]);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit?.(search);
      }}
    >
      <Group spacing={0} className={cx(classes.container, className)}>
        <TextInput
          placeholder="검색어를 입력해주세요."
          className={classes.input}
          value={search}
          onChange={(event) => setSearch(event.currentTarget.value)}
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
