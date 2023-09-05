import { Button, Group, Menu, UnstyledButton, useMantineTheme } from "@mantine/core";
import { useCustomNativeSelectStyles } from "./CustomNativeSelect.styles";
import { useState } from "react";
import { IconChevronDown } from "@tabler/icons-react";

export interface CustomNativeSelect {
  data: string[];
  defaultValue: string;
  height?: string;
  position?: "start" | "end";
  onChange: (value: string) => void;
}

export function CustomNativeSelect({
  data,
  defaultValue,
  height,
  position,
  onChange,
}: CustomNativeSelect) {
  const { classes, cx } = useCustomNativeSelectStyles({ height });
  const theme = useMantineTheme();

  const [value, setValue] = useState(defaultValue);
  const menuItems = data.map((item) => (
    <Menu.Item
      onClick={() => {
        onChange(item);
        setValue(item);
      }}
    >
      {item}
    </Menu.Item>
  ));

  return (
    <Menu
      position={position === "start" ? "bottom-start" : "bottom-end"}
      width={"7rem"}
      shadow="sm"
    >
      <Menu.Target>
        <UnstyledButton className={classes.button} variant="outline">
          <Group spacing={"0.3rem"}>
            {value}
            <IconChevronDown color={theme.colors.gray[5]} stroke={1.6} size={"1.3rem"} />
          </Group>
        </UnstyledButton>
      </Menu.Target>

      <Menu.Dropdown className={classes.menuDropdown}>{menuItems}</Menu.Dropdown>
    </Menu>
  );
}
