import { Checkbox, Group, Text, Container } from '@mantine/core';
import { useListState } from '@mantine/hooks';
import { useLeftSidebarStyles } from './LeftSidebar.styles';
import { CategoryValues, DevelopValues } from './LeftSidebar.constants';

export interface LeftSidebarProps {
  links: { label: string; link: string }[];
}

export function LiftSidebar() {
  const { classes, cx } = useLeftSidebarStyles();

  const [values, handlers] = useListState(DevelopValues); // useListState : list처럼 작동하게 하는 듯

  const allChecked = values.every((value) => value.checked); // every : 모든 요소가 true면 true 반환
  const indeterminate = values.some((value) => value.checked) && !allChecked;

  const items = values.map((value, index) => ( // map : 각 요소에 대하여 그 값을 반환
    <Checkbox
      mt="xs"
      ml={33}
      label={value.label}
      key={value.key}
      checked={value.checked}
      onChange={(event) => handlers.setItemProp(index, 'checked', event.currentTarget.checked)}
    />
  ));

  return (
    <Container className={classes.CategoryBox}>
      <Text className={classes.Category}>카테고리</Text>
      <Group className={classes.Checkbox}>
        <>
          <Checkbox
            checked={allChecked}
            indeterminate={indeterminate}
            label="개발"
            transitionDuration={0}
            onChange={() => // onChange : 체크 상태가 변경되면 이벤트 발생
              handlers.setState((current) =>
                current.map((value) => ({ ...value, checked: !allChecked }))
              )
            }
          />
          {items}
        </>
      </Group>
    </Container>
  );
}