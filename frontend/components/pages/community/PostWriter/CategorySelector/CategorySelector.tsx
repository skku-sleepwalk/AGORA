import { MultiSelect } from "@mantine/core";
import { useCategorySelectorStyles } from "./CategorySelector.styles";
import { ComponentPropsWithoutRef } from "react";
import { Category, CategoryNum, Values } from "../../../../../constants/category";
import { useListState } from "@mantine/hooks";

let data = new Array();

for (let i = 0; i < CategoryNum; i++) {
  const values = Values[i];
  values.map(
    ( value ) => {
      data.push({ values: value.label, label: value.label, group: Category[i]});
    }
  )
};

export interface CategorySelectorProps
  extends Omit<ComponentPropsWithoutRef<typeof MultiSelect>, "data"> {}

function CategorySelector({ ...others }: CategorySelectorProps) {
  const { classes } = useCategorySelectorStyles();

  return (
    <MultiSelect
      data={data}
      label="카테고리"
      placeholder="하나 이상의 카테고리를 선택해주세요."
      className={classes.multiSelect}
      {...others}
    />
  );
}

export default CategorySelector;
