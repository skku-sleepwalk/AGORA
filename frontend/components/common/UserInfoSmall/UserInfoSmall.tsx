import { Avatar, Group, Stack, Text, useMantineTheme } from "@mantine/core";
import { User } from "../../../types/api/user";

export interface UserInfoProps {
  user: User;
}

function UserInfo({ user }: UserInfoProps) {
  const theme = useMantineTheme();

  return (
    <Group spacing={7}>
      <Avatar src="https://avatars.githubusercontent.com/u/52057157?v=4" radius="xl" size={20} />
      <Stack spacing={5}>
        <Text size="xs">{user.name}</Text>
      </Stack>
    </Group>
  );
}

export default UserInfo;
