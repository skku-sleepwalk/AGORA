import {
  Stack,
  Image,
  Text,
  useMantineTheme,
  Group,
  Avatar,
  Button,
  Box,
  BackgroundImage,
} from "@mantine/core";
import CardContainer from "../../../../common/CardContainer/CardContainer";
import { useMainAssetStyles } from "./MainAsset.styles";
import { IconBookmark, IconHeart } from "@tabler/icons-react";
import Link from "next/link";
import { Asset } from "../../../../../types/api/asset";

interface MainAssetProps {
  assetData: Asset;
}

export function MainAsset({ assetData }: MainAssetProps) {
  const { classes, cx } = useMainAssetStyles();
  const theme = useMantineTheme();

  const isSale = assetData.cost.isSale;

  return (
    <Link href={`/asset/${assetData.id}`} className={classes.link}>
      <CardContainer className={classes.wrapper}>
        <Stack spacing={"xs"}>
          <BackgroundImage
            src={"https://i3.ruliweb.com/img/22/10/01/18393ee297a1734b9.jpeg"}
            h={"10rem"}
            radius={"md"}
          >
            <Box className={classes.infoBox}>
              <Text color="#fff" lineClamp={4}>
                {assetData.description}
              </Text>
            </Box>
          </BackgroundImage>
          <Stack spacing={"0.2rem"}>
            <Group spacing={"xs"}>
              <Text fz={12} c={theme.colors.teal[5]}>
                {assetData.category.name}
              </Text>
              {isSale && <Box className={classes.saleBox}>-{assetData.cost.salePercentage}%</Box>}
            </Group>
            <Text fz={14} fw={"bold"} lineClamp={1}>
              {assetData.title}
            </Text>
            <Group spacing={"0.2rem"}>
              <Avatar radius="xl" size="xs" />
              <Text fz={12} lineClamp={1}>
                {assetData.author.name}
              </Text>
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
                <Text fz={12} className={cx(isSale && classes.saleText)}>
                  {isSale ? assetData.cost.saledPrice : assetData.cost.defaultPrice}
                </Text>
              </Group>
            </Button>
          </Group>
        </Stack>
      </CardContainer>
    </Link>
  );
}
