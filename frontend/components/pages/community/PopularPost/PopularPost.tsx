import { Container, Group, Box, Text, Image, Stack, Badge, Divider } from "@mantine/core";
import { useListState } from "@mantine/hooks";
import { usePopularPostStyles } from "./PopularPost.styles";
import { PopularPostValues, PopularPostNum } from "./PopularPost.constants";

export interface PopularPostProps {
  onPopularPostChange?: (popularPost: string[]) => void;
}

export function PopularPost({ onPopularPostChange }: PopularPostProps) {
  const { classes } = usePopularPostStyles();

  const [values, handlers] = useListState(PopularPostValues);

  let Items = new Array(PopularPostNum - 2);
  for (let i = 0; i < PopularPostNum - 2; i++) {
    Items[i] = (
      <Box>
        <Badge className={classes.Badge} 
          variant="light" radius="md" size="lg"
          component="a" href={values[i + 2].href} fullWidth>
          {values[i + 2].label}
        </Badge>
      </Box>
    );
  }

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
          <Box w={'6.5rem'}>
            <Badge className={classes.Badge} 
              variant="light" radius="md"
              component="a" href={values[0].href} fullWidth>
              {values[0].label}
            </Badge>
          </Box>
          <Box w={'6.5rem'}>
            <Badge className={classes.Badge} 
              variant="light" radius="md"
              component="a" href={values[1].href} fullWidth>
              {values[1].label}
            </Badge>
          </Box>
        </Group>
        <Divider/>
        {Items}
      </Stack>
    </Container>
  );
}