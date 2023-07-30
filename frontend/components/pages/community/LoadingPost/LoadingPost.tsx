import { Container, Group, Skeleton, Stack } from "@mantine/core";
import CardContainer from "../../../common/CardContainer/CardContainer";
import { useLoadingPostStyles } from "./LoadingPost.styles";

export function LoadingPost() {
  const { classes } = useLoadingPostStyles();

  return (
    <CardContainer className={classes.postContainer} bg={"white"}>
      <Stack spacing={14}>
        <Group position="apart" align="flex-start">
          <Group spacing={14}>
            <Skeleton height={46} circle />
            <Stack spacing={5}>
              <Skeleton height={16} width={100} radius="sm" />
              <Skeleton height={12} width={150} radius="sm" />
            </Stack>
          </Group>
          <Skeleton height={12} width={30} radius="sm" />
        </Group>
        <Container className={classes.content}>
          <Stack spacing={8} h={157} justify="center">
            <Skeleton height={16} radius="sm" />
            <Skeleton height={16} radius="sm" />
            <Skeleton height={16} radius="sm" />
            <Skeleton height={16} radius="sm" />
            <Skeleton height={16} radius="sm" />
            <Skeleton height={16} radius="sm" />
          </Stack>
        </Container>
      </Stack>
    </CardContainer>
  );
}
