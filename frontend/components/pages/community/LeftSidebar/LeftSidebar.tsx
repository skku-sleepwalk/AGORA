import { Checkbox, Group, Container, Box, Stack, Collapse, Text, Button } from "@mantine/core";
import { useListState, useDisclosure } from "@mantine/hooks";
import { IconChevronDown, IconCornerDownRight } from "@tabler/icons-react";
import { useLeftSidebarStyles } from "./LeftSidebar.styles";
import { Category, CategoryNum, Values } from "./LeftSidebar.constants";
import { useEffect } from "react";

export interface LeftSidebarProps {
  onCategoryChange?: (category: string[]) => void;
}

export function LeftSidebar({ onCategoryChange }: LeftSidebarProps) {
  const { classes } = useLeftSidebarStyles();
  const categoryNames = Values.reduce(
    (acc, cur) => [...acc, ...cur.map((item) => item.label)],
    [] as string[]
  );
  const [checked, checkedHandler] = useListState<string>(categoryNames);

  useEffect(() => {
    onCategoryChange?.(checked);
  }, [checked]);

  let CategoryItems = new Array(CategoryNum);
  for (let i = 0; i < CategoryNum; i++) {
    const [values, handlers] = useListState(Values[i]); // useListState : list처럼 작동하게 하는 듯

    const [opened, { toggle }] = useDisclosure(false);

    const allChecked = values.every((value) => value.checked); // every : 모든 요소가 true면 true 반환
    const indeterminate = values.some((value) => value.checked) && !allChecked;

    const Items = values.map(
      (
        value,
        index // map : 각 요소에 대하여 그 값을 반환
      ) => {
        return (
          <Group spacing="xs">
            <IconCornerDownRight stroke={1.5} />
            <Checkbox
              label={value.label}
              key={value.key}
              checked={value.checked}
              onChange={(event) => {
                const checked = event.currentTarget.checked;
                handlers.setItemProp(index, "checked", checked);
                if (checked) checkedHandler.append(value.label);
                else checkedHandler.filter((item) => item !== value.label);
              }}
            />
          </Group>
        );
      }
    );

    CategoryItems[i] = (
      <Box className={classes.CheckboxGroup}>
        <Group position="apart">
          <Checkbox
            display={"inline-block"}
            checked={allChecked}
            indeterminate={indeterminate}
            label={Category[i]}
            transitionDuration={0}
            onChange={() => {
              // onChange : 체크 상태가 변경되면 이벤트 발생
              handlers.setState((current) =>
                current.map((value) => ({ ...value, checked: !allChecked }))
              );
              if (allChecked)
                checkedHandler.filter((item) => values.every((value) => value.label !== item));
              else
                checkedHandler.append(
                  ...values.map((value) => value.label).filter((item) => !checked.includes(item))
                );
            }}
          />
          <Button onClick={toggle} variant="white" className={classes.DropDownButton}>
            <IconChevronDown stroke={1.5} color="#000" />
          </Button>
        </Group>
        <Collapse in={opened} className={classes.PaddingTop}>
          <Stack spacing="sm">{Items}</Stack>
        </Collapse>
      </Box>
    );
  }

  return (
    <Container className={classes.CategoryContainer}>
      <Text className={classes.CategoryText}>카테고리</Text>
      <Stack align="flex-start" spacing="md" className={classes.PaddingBottom}>
        {CategoryItems}
      </Stack>
    </Container>
  );
}
