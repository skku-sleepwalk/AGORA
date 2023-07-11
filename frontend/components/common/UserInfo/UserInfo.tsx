import { Avatar, Group, Stack, Text, useMantineTheme } from "@mantine/core";
import { User } from "../../../types/api/user";

export interface UserInfoProps {
  user: User;
}

function UserInfo({ user }: UserInfoProps) {
  const theme = useMantineTheme();

  return (
    <Group spacing={14}>
      <Avatar src="https://avatars.githubusercontent.com/u/55127132?v=4" radius="xl" size={46} />
      <Stack spacing={5}>
        <Text size="md">{user.name}</Text>
        <Text size="xs" color={theme.colors.gray[5]}>
          {user.description}
        </Text>
      </Stack>
    </Group>
  );
}

export default UserInfo;
