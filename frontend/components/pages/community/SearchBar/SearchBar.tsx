import { Center, Group, TextInput, UnstyledButton } from "@mantine/core";
import { useSearchBarStyles } from "./SearchBar.styles";
import { IconSearch } from "@tabler/icons-react";

export interface SearchBarProps {
  className?: string;
}

function SearchBar({ className }: SearchBarProps) {
  const { classes, cx } = useSearchBarStyles();

  return (
    <Group spacing={0} className={cx(classes.container, className)}>
      <TextInput placeholder="검색어를 입력해주세요." className={classes.input} />
      <UnstyledButton variant="transparent" className={classes.searchButton}>
        <Center>
          <IconSearch className={classes.searchIcon} />
        </Center>
      </UnstyledButton>
    </Group>
  );
}

export default SearchBar;
