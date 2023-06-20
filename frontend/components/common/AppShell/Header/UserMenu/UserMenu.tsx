import { Group, Avatar, Text, Button, useMantineTheme, Menu } from "@mantine/core";
import { IconChevronDown, IconSettings, IconUser, IconLogout } from "@tabler/icons-react";
import { useUserMenuStyles } from "./UserMenu.styles";

interface UserMenu {
  image: string;
  name: string;
}

export function UserMenu({ image, name }: UserMenu) {
  const { classes } = useUserMenuStyles();

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Button className={classes.userMenu} variant="white">
          <Group>
            <Avatar src={image} radius="xl" size={30} />
            <Text size="md">{name}</Text>
            <IconChevronDown size="0.9rem" stroke={1.5} />
          </Group>
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>메뉴</Menu.Label>
        <Menu.Item icon={<IconUser />}>마이페이지</Menu.Item>
        <Menu.Item icon={<IconSettings />}>설정</Menu.Item>
        <Menu.Item icon={<IconLogout />}>로그아웃</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
