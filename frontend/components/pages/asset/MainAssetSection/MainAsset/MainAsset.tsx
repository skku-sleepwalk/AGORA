import {
  Stack,
  UnstyledButton,
  Image,
  Text,
  useMantineTheme,
  Group,
  Avatar,
  Button,
  Box,
} from "@mantine/core";
import CardContainer from "../../../../common/CardContainer/CardContainer";
import { useMainAssetStyles } from "./MainAsset.styles";
import { IconBookmark, IconHeart } from "@tabler/icons-react";

export function MainAsset() {
  const { classes, cx } = useMainAssetStyles();
  const theme = useMantineTheme();

  return (
    <UnstyledButton>
      <CardContainer className={classes.wrapper}>
        <Stack spacing={"xs"}>
          <Image
            src={"https://i3.ruliweb.com/img/22/10/01/18393ee297a1734b9.jpeg"}
            height={"10rem"}
            radius={"md"}
          />
          <Stack spacing={"0.2rem"}>
            <Text fz={12} c={theme.colors.teal[5]}>
              2D
            </Text>
            <Text fz={14} fw={"bold"}>
              원신_나히다_일러.jpeg
            </Text>
            <Group spacing={"0.2rem"}>
              <Avatar radius="xl" size="xs" />
              <Text fz={12}>아야토 개화 떡상 기원</Text>
            </Group>
          </Stack>
          <Group position="apart">
            <Group spacing={"0.3rem"}>
              <Button className={classes.button} variant="default" radius="md">
                <IconHeart size={"1rem"} stroke={1.2} />
              </Button>
              <Button className={classes.button} variant="default" radius="md">
                <IconBookmark size={"1rem"} stroke={1.2} />
              </Button>
            </Group>
            <Button className={classes.button} w={"auto"} variant="default" radius="md">
              <Group spacing={"0.3rem"}>
                <Image src="/images/token.svg" width={"0.85rem"} height={"0.85rem"} />
                <Text fz={12}>1700</Text>
              </Group>
            </Button>
          </Group>
        </Stack>
      </CardContainer>
    </UnstyledButton>
  );
}
