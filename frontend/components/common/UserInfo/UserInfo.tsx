import { Avatar, Center, Container, Group, Stack, Text, useMantineTheme } from "@mantine/core";
import { User } from "../../../types/user";

export interface UserInfoProps {
  user: User;
}

function UserInfo({ user }: UserInfoProps) {
  const theme = useMantineTheme();

  return (
    <Group spacing={14}>
      <Avatar src={user.avatar} radius="xl" size={46} />
      <Stack spacing={5}>
        <Text size="md">{user.name}</Text>
        <Text size="xs" color={theme.colors.gray[5]}>
          {user.info}
        </Text>
      </Stack>
    </Group>
  );
}

export default UserInfo;
