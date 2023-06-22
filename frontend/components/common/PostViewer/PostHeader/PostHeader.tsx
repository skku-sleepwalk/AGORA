import { Group, Text } from "@mantine/core";
import { User } from "../../../../types/user";
import UserInfo from "../../UserInfo/UserInfo";
import { getRelativeTime } from "../../../../utils/getRelativeTime";

export interface PostHeaderProps {
  user: User;
  date: string;
}

function PostHeader({ user, date }: PostHeaderProps) {
  return (
    <Group position="apart" align="flex-start">
      <UserInfo user={user} />
      <Text size="xs" color="gray">
        {getRelativeTime(date)}
      </Text>
    </Group>
  );
}

export default PostHeader;
