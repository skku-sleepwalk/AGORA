import { Checkbox, Group, Container, Box, Stack, Collapse, Text, Button, CheckboxProps } from "@mantine/core";
import { useListState, useDisclosure, useSetState } from "@mantine/hooks";
import { IconChecks, IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import { useCommunityCategoryStyles } from "./CommunityCategory.styles";
import { Category, CategoryNum, Values } from "../../../../constants/category";
import { useEffect } from "react";
import { theme } from "../../../../styles/theme";

export interface CommunityCategoryProps {
  onCategoryChange?: (category: string[]) => void;
}

export function CommunityCategory({ onCategoryChange }: CommunityCategoryProps) {
  const { classes, cx } = useCommunityCategoryStyles();
  const categoryNames = Values.reduce(
    (acc, cur) => [...acc, ...cur.map((item) => item.label)],
    [] as string[]
  );
  const [checked, checkedHandler] = useListState<string>(categoryNames);

  useEffect(() => {
    onCategoryChange?.(checked);
  }, [checked]);

  // 카테고리 모두 선택/해제 관련
  const [state, setState] = useSetState({ checked: true, isChanging: false });

  let CategoryItems = new Array(CategoryNum);
  for (let i = 0; i < CategoryNum; i++) {
    const [values, handlers] = useListState(Values[i]); // useListState : list처럼 작동하게 하는 듯

    const [opened, { toggle }] = useDisclosure(false);

    const allChecked = values.every((value) => value.checked); // every : 모든 요소가 true면 true 반환
    const indeterminate = values.some((value) => value.checked) && !allChecked;

    const Items = values.map( // map : 각 요소에 대하여 그 값을 반환
      (
        value,
        index
      ) => {
        return (
          <Group spacing="xs">
            <Checkbox
              label={value.label}
              key={value.key}
              checked={value.checked}
              onChange={(event) => {
                const checked = event.currentTarget.checked; // checkbox가 checked인지 반환
                handlers.setItemProp(index, "checked", checked); // 해당 index의 checked 속성을 checked로 설정

                if (checked) checkedHandler.append(value.label);  // 만약 checked이면 checkHandler에 value.label 추가
                else checkedHandler.filter((item) => item !== value.label); // 아니면 checkHandler에서 value.label 제거
              }}
            />
          </Group>
        );
      }
    );

    const ChangeCategoryItems = () => {
      // onChange : 체크 상태가 변경되면 이벤트 발생
      handlers.setState((current) =>
        current.map((value) => ({ ...value, checked: !allChecked }))
      ); // handler가 현재 상태 배열을 받아서 각 value의 checked 속성을 반전시킴.

      if (allChecked) // 만약 위 코드로 모두 선택된 상태가 아니면
        checkedHandler.filter((item) => values.every((value) => value.label !== item));
        // checkedHandler 배열을 필터링하여 values 배열의 각 요소의 label 속성과 다른 요소들만 남김
      else // 위 코드로 모두 선택된 상태가 되면
        checkedHandler.append(
          ...values.map((value) => value.label).filter((item) => !checked.includes(item))
        );
        // values 배열의 각 요소의 label 속성을 추출하고, 
        // 이 중 checked 배열에 포함되지 않은 요소들을 checkedHandler 배열에 추가
    }

    CategoryItems[i] = (
      <Box className={classes.CheckboxGroup}>
        <Group position="apart">
          <Checkbox
            display={"inline-block"}
            checked={allChecked}
            indeterminate={indeterminate}
            label={Category[i]}
            transitionDuration={0}
            onChange={ChangeCategoryItems}
          />
          <Button onClick={toggle} variant="white" className={classes.DropDownButton}>
            {opened && <IconChevronUp stroke={1.5} color="#000"/>}
            {!opened && <IconChevronDown stroke={1.5} color="#000"/>}
          </Button>
        </Group>
        <Container className={classes.CheckboxItems}>
          <Collapse in={opened} className={classes.marginTop}>
            <Stack spacing="sm">
              {Items}
            </Stack>
          </Collapse>
        </Container>
      </Box>
    );

    // 카테고리 모두 선택/해제 관련
    if (state.isChanging) {
      if (allChecked != state.checked) {
        ChangeCategoryItems();
      }
      else if (!state.checked && indeterminate) {
        ChangeCategoryItems();
      }
      setState({ isChanging: false });
    }
  }

  const CheckboxIcon: CheckboxProps['icon'] = ({ indeterminate, className }) => 
    indeterminate? <IconChecks size={15} stroke={3} className={cx(className, classes.allCheckBoxIcon)}/>: <IconChecks size={15} stroke={3} className={cx(className, classes.allCheckBoxIcon)}/>;

  const AllCheckBox = (
    <Checkbox
      className={classes.allCheckBox}
      icon={CheckboxIcon}
      color="cyan"
      label="카테고리 모두 선택/해제"
      checked={state.checked}
      onChange={() => {
        setState((current) => ({ checked: current.checked? false: true }));
        setState({ isChanging: true });
      }}
    />
  );
  
  return (
    <Container className={classes.CategoryContainer}>
      <Text className={classes.CategoryText}>카테고리</Text>
      {AllCheckBox}
      <Stack align="flex-start" spacing="md" className={classes.PaddingBottom}>
        {CategoryItems}
      </Stack>
    </Container>
  );
}
