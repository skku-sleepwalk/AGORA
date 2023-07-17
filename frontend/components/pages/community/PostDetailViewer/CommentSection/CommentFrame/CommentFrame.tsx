import { Avatar, Container, Group, Stack, Title } from "@mantine/core";
import { useCommentFrameStyles } from "./CommentFrame.styles";
import { User } from "../../../../../../../types/api/user";

export interface CommentFrameProps {
  children: React.ReactNode;
  user: User;
  withoutLeftBorder?: boolean;
}

function CommentFrame({ children, user, withoutLeftBorder = false }: CommentFrameProps) {
  const { classes } = useCommentFrameStyles({ withoutLeftBorder });

  return (
    <Group spacing={7} className={classes.commentFrame}>
      <Avatar
        src={"https://avatars.githubusercontent.com/u/44080404?v=4"}
        radius="xl"
        size={35}
        className={classes.avatar}
      />
      <Container className={classes.commentWrapper}>
        <Stack spacing={0} className={classes.commentContainer}>
          <Title order={6} className={classes.userName}>
            {user.name}
          </Title>
          {children}
        </Stack>
      </Container>
    </Group>
  );
}

export default CommentFrame;
