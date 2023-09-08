import { Avatar, BackgroundImage, Box, Group, Stack, Text } from "@mantine/core";
import { useMypageUserInfoStyles } from "./mypageUserInfo.styles";
import useAuth from "../../../../hooks/useAuth";

export function MypageUserInfo() {
  const { classes, cx } = useMypageUserInfoStyles();
  const { user, token } = useAuth();

  return (
    <Box className={classes.box}>
      <BackgroundImage
        className={classes.backgroundImage}
        h={"100%"}
        radius={0}
        src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbQro8K%2FbtqDvh5lVQm%2FO765YYrxZwDO8mtY59Zo80%2Fimg.jpg"
      >
        <Group className={classes.group}>
          <Avatar
            className={classes.avatar}
            src="https://avatars.githubusercontent.com/u/52057157?v=4"
            radius="50%"
          />
          <Stack>
            <Text className={classes.username} color="white">
              {user?.name}
            </Text>
            <Text className={classes.userinfo} color="white">
              팔로워 0명
            </Text>
          </Stack>
        </Group>
      </BackgroundImage>
    </Box>
  );
}
