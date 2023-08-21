import CardContainer from "../../../common/CardContainer/CardContainer";
import {
  Anchor,
  Box,
  Button,
  Center,
  Group,
  Image,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { useSetState } from "@mantine/hooks";
import { Asset } from "../../../../types/api/asset";
import { useAssetRightSideStyles } from "./AssetRightSide.styles";

interface AssetRightSideProps {
  asset: Asset | undefined;
  loading?: boolean;
}
export function AssetRightSide({ asset, loading }: AssetRightSideProps) {
  const { classes, cx } = useAssetRightSideStyles();

  const theme = useMantineTheme();

  return (
    <Box className={classes.box}>
      {/* 첫 번째 컨테이너 */}
      <CardContainer className={cx(classes.container, classes.alignCenter)}>
        <Stack className={cx(classes.containerPadding, classes.container)} spacing={20}>
          <Group position="apart" className={classes.container}>
            <Text size="md" weight={700}>
              Liscence Agreement
            </Text>
            <Anchor href="https://www.google.com">간장게장 밥도둑</Anchor>
          </Group>
          <Group position="apart" className={classes.container}>
            <Text size="md" weight={700}>
              라이선스
            </Text>
            <Anchor href="https://www.google.com">에셋의 사용범위에 대해</Anchor>
          </Group>
          <Group position="apart" className={classes.container}>
            <Text size="md" weight={700}>
              파일 크기
            </Text>
            <Text size="md">111.99 MB</Text>
          </Group>
          <Group position="apart" className={classes.container}>
            <Text size="md" weight={700}>
              최신 버전
            </Text>
            <Text size="md">1.291</Text>
          </Group>
          <Group position="apart" className={classes.container}>
            <Text size="md" weight={700}>
              최신 릴리즈 날짜
            </Text>
            <Text size="md">2023년 5월 17일</Text>
          </Group>
        </Stack>
      </CardContainer>
    </Box>
  );
}
