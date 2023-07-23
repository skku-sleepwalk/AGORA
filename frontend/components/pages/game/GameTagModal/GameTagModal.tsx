import { Box, MultiSelect } from "@mantine/core";
import { useGameTagModalStyles } from "./GameTagModal.styles";
import { useState } from "react";

export function GameTagModal() {
  const { classes, cx } = useGameTagModalStyles();
  const [searchValue, onSearchChange] = useState("");
  const data = [
    { value: "react", label: "React" },
    { value: "ng", label: "Angular" },
    { value: "svelte", label: "Svelte" },
    { value: "vue", label: "Vue" },
    { value: "riot", label: "Riot" },
    { value: "next", label: "Next.js" },
    { value: "blitz", label: "Blitz.js" },
    { value: "python", label: "Python" },
    { value: "typeScript", label: "TypeScript" },
  ];

  return (
    <Box h={"20rem"}>
      <MultiSelect
        className={classes.multiSelect}
        data={data}
        placeholder="태그를 검색하거나 선택해보세요."
        searchable
        searchValue={searchValue}
        onSearchChange={onSearchChange}
        nothingFound="관련 태그가 없습니다."
        disableSelectedItemFiltering
        clearButtonProps={{ "aria-label": "Clear selection" }}
        clearable
        dropdownPosition="bottom"
        dropdownComponent="div"
      />
    </Box>
  );
}
