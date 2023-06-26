import { Checkbox, Group, Text, Container, Menu, Button } from '@mantine/core';
import { useListState } from '@mantine/hooks';
import { IconChevronDown } from "@tabler/icons-react";
import { useLeftSidebarStyles } from './LeftSidebar.styles';
import { Category, Values } from './LeftSidebar.constants';

export interface LeftSidebarProps {
  links: { label: string; link: string }[];
}

export function LeftSidebar() {
  const { classes, cx } = useLeftSidebarStyles();

  const [category] = useListState(Category);
  let CategoryItems = new Array(3);
  for (let i = 0; i < 3; i++) {
    const [values, handlers] = useListState(Values[i]); // useListState : list처럼 작동하게 하는 듯

    const allChecked = values.every((value) => value.checked); // every : 모든 요소가 true면 true 반환
    const indeterminate = values.some((value) => value.checked) && !allChecked;

    const Items = values.map((value, index) => ( // map : 각 요소에 대하여 그 값을 반환
      <Menu.Item>
        <Checkbox
          mt="xs"
          //ml={33}
          label={value.label}
          key={value.key}
          checked={value.checked}
          onChange={(event) => handlers.setItemProp(index, 'checked', event.currentTarget.checked)}
        />
      </Menu.Item>
    ));

    CategoryItems[i] = category.map((value) => (
      <Menu position="bottom-start" closeOnItemClick={false}>
        <Group className={classes.CheckboxGroup}>
          <Checkbox 
            display={'inline-block'}
            checked={allChecked}
            indeterminate={indeterminate}
            label={value.label}
            transitionDuration={0}
            onChange={() => // onChange : 체크 상태가 변경되면 이벤트 발생
              handlers.setState((current) =>
                current.map((value) => ({ ...value, checked: !allChecked }))
              )
            }
          />
          <Menu.Target> 
            <Button variant="white" className={classes.DropDownButton}>
              <IconChevronDown stroke={1.5}  color='#000'/>
            </Button>
          </Menu.Target>
            <Menu.Dropdown display={'block'}>
              {Items}
            </Menu.Dropdown>
        </Group>
      </Menu>
    ));
  }

  return (
    <Container className={classes.CategoryContainer}>
      <Text className={classes.CategoryText}>카테고리</Text>
      <Group>
        {CategoryItems[0]}
        {CategoryItems[1]}
      </Group>
    </Container>
  );
}