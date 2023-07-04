import { Container, Group, Text, Image, Stack } from "@mantine/core";
import { useListState } from "@mantine/hooks";
import { usePopularPostStyles } from "./PopularPost.styles";
import { PopularPostValues } from "./PopularPost.constants";

export interface PopularPostProps {
  onPopularPostChange?: (popularPost: string[]) => void;
}

export function PopularPost({ onPopularPostChange }: PopularPostProps) {
  const { classes } = usePopularPostStyles();

  const [values, handlers] = useListState(PopularPostValues);

  return (
    <Container className={classes.PopularPostContainer}>
      <Text className={classes.PopularPostText}>인기글</Text>
      <Stack spacing={"xs"} className={classes.PaddingBottom}>
        <Group position="apart">
          <Image 
            width={'6.5rem'} height={'6.5rem'} radius={'0.94rem'} 
            src={values[0].src} fit="cover">
          </Image>
          <Image 
            width={'6.5rem'} height={'6.5rem'} radius={'0.94rem'} 
            src={values[1].src} fit="cover">
          </Image>
        </Group>
        <Group position="apart">
          <Text size={'xs'}>{values[0].label}</Text>
          <Text size={'xs'}>{values[1].label}</Text>
        </Group>
      </Stack>
      
    </Container>
  );
}