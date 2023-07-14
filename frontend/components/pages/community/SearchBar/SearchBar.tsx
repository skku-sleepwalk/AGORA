import { Button, Group, TextInput } from "@mantine/core";
import { useSearchBarStyles } from "./SearchBar.styles";
import { IconSearch, IconX } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import CardContainer from "../../../common/CardContainer/CardContainer";
import InvisibleButton from "../../../common/InvisibleButton/InvisibleButton";

export interface SearchBarProps {
  onSubmit?: (text: string) => void;
  defaultValue?: string;
}

function SearchBar({ onSubmit, defaultValue }: SearchBarProps) {
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
      <CardContainer className={classes.container}>
        <Group spacing={'xs'} className={classes.group}>
          <TextInput
            placeholder="원하는 글을 검색해보세요."
            className={classes.input}
            value={search}
            onChange={(event) => setSearch(event.currentTarget.value)}
            rightSection={
              <InvisibleButton>
                <IconX onClick={() => {setSearch("")}}
                  size={"1rem"} stroke={"0.15rem"} color="#bdc3cd"/>
              </InvisibleButton>
            }
          />
          <Button className={classes.searchButton} 
            type="submit" color="cyan">
            <IconSearch stroke={"0.15rem"}/>
          </Button>
        </Group>
      </CardContainer>
    </form>
  );
}

export default SearchBar;
