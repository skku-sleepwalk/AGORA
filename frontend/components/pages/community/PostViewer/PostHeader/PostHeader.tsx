import { Group, Text } from "@mantine/core";
import { User } from "../../../../../types/user";
import { getRelativeTime } from "../../../../../utils/getRelativeTime";
import UserInfo from "../../../../common/UserInfo/UserInfo";

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
