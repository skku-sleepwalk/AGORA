import { Avatar, Container, Group, Stack, Title, Text } from "@mantine/core";
import { useCommentFrameStyles } from "./CommentFrame.styles";
import { User } from "../../../../../../types/api/user";
import { getRelativeTime } from "../../../../../../utils/getRelativeTime";
import useAuth from "../../../../../../hooks/useAuth";

export interface CommentFrameProps {
  children: React.ReactNode;
  user: User;
  date: string | null;
  withoutLeftBorder?: boolean;
}

function CommentFrame({ children, user, date, withoutLeftBorder = false }: CommentFrameProps) {
  const { classes } = useCommentFrameStyles({ withoutLeftBorder });

  return (
    <Group spacing={7} className={classes.commentFrame}>
      {user ? (
        <Avatar
          src={"https://avatars.githubusercontent.com/u/55127132?v=4"}
          radius="xl"
          size={35}
          className={classes.avatar}
        />
      ) : (
        <Avatar radius="xl" size={35} className={classes.avatar} />
      )}
      <Container className={classes.commentWrapper}>
        <Stack spacing={0} className={classes.commentContainer}>
          <Group spacing={"xs"}>
            <Title order={6} className={classes.userName}>
              {user?.name}
            </Title>
            {user && date !== null && (
              <Text size="xs" color="gray" className={classes.date}>
                {getRelativeTime(date)}
              </Text>
            )}
          </Group>
          {children}
        </Stack>
      </Container>
    </Group>
  );
}

export default CommentFrame;
