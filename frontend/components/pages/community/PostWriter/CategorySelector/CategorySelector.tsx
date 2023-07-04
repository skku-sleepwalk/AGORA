import { MultiSelect } from "@mantine/core";
import { useCategorySelectorStyles } from "./CategorySelector.styles";
import { ComponentPropsWithoutRef } from "react";

const data = [
  { value: "C#", label: "C#", group: "개발" },
  { value: "C++", label: "C++", group: "개발" },
  { value: "Java", label: "Java", group: "개발" },
  { value: "JavaScript", label: "JavaScript", group: "개발" },
  { value: "Python", label: "Python", group: "개발" },
  { value: "캐릭터", label: "캐릭터", group: "디자인" },
  { value: "배경", label: "배경", group: "디자인" },
  { value: "폰트", label: "폰트", group: "디자인" },
  { value: "Unity 공모전", label: "Unity 공모전", group: "공모전" },
  { value: "게임 공모전", label: "게임 공모전", group: "공모전" },
  { value: "디자인 공모전", label: "디자인 공모전", group: "공모전" },
];

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
