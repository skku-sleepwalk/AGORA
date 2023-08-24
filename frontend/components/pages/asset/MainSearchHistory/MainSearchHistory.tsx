import { Box, Group, Loader, Text, useMantineTheme } from "@mantine/core";
import { useMainSearchHistoryStyles } from "./MainSearchHistory.styles";
import InvisibleButton from "../../../common/InvisibleButton/InvisibleButton";
import { IconX } from "@tabler/icons-react";
import {
  deleteAllAssetSearchHistory,
  deleteAssetSearchHistory,
} from "../../../../utils/api/asset/assetSearchHistory";
import useAuth from "../../../../hooks/useAuth";
import { AssetSearchHistory } from "../../../../types/api/asset";
import { AssetContext } from "../../../../pages/asset";
import { useContext } from "react";
import { useRouter } from "next/router";

interface MainSearchHistoryProps {
  data: AssetSearchHistory[] | undefined;
  isLoading: boolean;
}

export function MainSearchHistory({ data, isLoading }: MainSearchHistoryProps) {
  const { classes, cx } = useMainSearchHistoryStyles();
  const theme = useMantineTheme();
  const { token } = useAuth();
  const router = useRouter();

  const { mutateSearchHistory } = useContext(AssetContext);

  const histories = data?.map((item) => {
    return (
      <InvisibleButton onClick={() => router.push(`?search=${item.keyword}`)}>
        <Group className={classes.badge} spacing={"0.3rem"}>
          <Text>{item.keyword}</Text>
          <InvisibleButton
            onClick={(e) => {
              e.stopPropagation();
              deleteAssetSearchHistory(item.keyword, token).then(() => {
                mutateSearchHistory();
              });
            }}
          >
            <IconX size={"0.8rem"} stroke={1.8} color={theme.colors.teal[1]} />
          </InvisibleButton>
        </Group>
      </InvisibleButton>
    );
  });

  return (
    <Box className={classes.wrapper}>
      <Group className={classes.group} position="apart">
        <Group>
          <Text className={classes.text}>최근 검색 기록</Text>
          {histories}
          {isLoading && <Loader color="teal" variant="dots" />}
        </Group>
        <InvisibleButton
          className={cx(classes.badge, classes.badgeBg)}
          onClick={async () => {
            deleteAllAssetSearchHistory(token).then(() => {
              mutateSearchHistory();
            });
          }}
        >
          <Text>모두 삭제</Text>
        </InvisibleButton>
      </Group>
    </Box>
  );
}
