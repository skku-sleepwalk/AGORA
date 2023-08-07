import { Group, Avatar, Text, Button, Menu } from "@mantine/core";
import { IconChevronDown, IconSettings, IconUser, IconLogout } from "@tabler/icons-react";
import { useUserMenuStyles } from "./UserMenu.styles";
import { useRouter } from "next/router";

export interface UserMenuProps {
  image: string;
  name: string;
}

export function UserMenu({ image, name }: UserMenuProps) {
  const { classes } = useUserMenuStyles();
  const router = useRouter();

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Button className={classes.userMenu} variant="white">
          <Group>
            <Avatar src={image} radius="xl" size={30} />
            <Text size="md" weight="normal">
              {name}
            </Text>
            <IconChevronDown stroke={1.5} />
          </Group>
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>메뉴</Menu.Label>
        <Menu.Item
          icon={<IconUser />}
          onClick={() => {
            router.replace("http://localhost:3000/mypage");
          }}
        >
          마이페이지
        </Menu.Item>
        <Menu.Item icon={<IconSettings />}>설정</Menu.Item>
        <Menu.Item icon={<IconLogout />}>로그아웃</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
