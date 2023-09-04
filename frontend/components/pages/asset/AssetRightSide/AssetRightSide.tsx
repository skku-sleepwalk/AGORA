import CardContainer from "../../../common/CardContainer/CardContainer";
import {
  Anchor,
  Box,
  Button,
  Center,
  Group,
  HoverCard,
  Image,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { useSetState } from "@mantine/hooks";
import { Asset } from "../../../../types/api/asset";
import { useAssetRightSideStyles } from "./AssetRightSide.styles";

interface AssetRightSideProps {
  asset: Asset;
  loading?: boolean;
}
export function AssetRightSide({ asset, loading }: AssetRightSideProps) {
  const { classes, cx } = useAssetRightSideStyles();
  const createstring = asset.createdAt;
  let [year, month, day] = createstring?.split("-") || [null, null, null];
  const formattedString = `${year}년 ${month}월 ${day?.slice(0, 2)}일`;

  const theme = useMantineTheme();

  return (
    <Box className={classes.box}>
      {/* 첫 번째 컨테이너 */}
      <CardContainer className={cx(classes.container, classes.alignCenter)}>
        <Stack className={cx(classes.containerPadding, classes.container)} spacing={20}>
          <Group position="apart" className={classes.container}>
            <Text size="md" weight={700}>
              라이선스
            </Text>
            <HoverCard width={280} shadow="sm" position="bottom-end">
              <HoverCard.Target>
                <Text className={classes.blueText}>CC BY</Text>
              </HoverCard.Target>
              <HoverCard.Dropdown>
                <Text size="sm" lh={1.3}>
                  원작자를 표시하면 저작물을 수정, 재배포, 상업적 이용 등 어떤 방식으로든 사용할 수
                  있습니다.
                </Text>
              </HoverCard.Dropdown>
            </HoverCard>
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
            <Text size="md">{formattedString}</Text>
          </Group>
        </Stack>
      </CardContainer>
    </Box>
  );
}
