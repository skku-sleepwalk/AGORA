import { Box, Group, Loader, Text, useMantineTheme } from "@mantine/core";
import { useMainSearchHistoryStyles } from "./MainSearchHistory.styles";
import InvisibleButton from "../../../common/InvisibleButton/InvisibleButton";
import { IconX } from "@tabler/icons-react";
import deleteAssetSearchHistory from "../../../../utils/api/asset/deleteAssetSearchHistory";
import useAuth from "../../../../hooks/useAuth";
import { AssetSearchHistory } from "../../../../types/api/asset";
import { AssetContext } from "../../../../pages/asset";
import { useContext } from "react";

interface MainSearchHistoryProps {
  data: AssetSearchHistory[] | undefined;
  isLoading: boolean;
}

export function MainSearchHistory({ data, isLoading }: MainSearchHistoryProps) {
  const { classes, cx } = useMainSearchHistoryStyles();
  const theme = useMantineTheme();
  const { token } = useAuth();

  const { mutateSearchHistory } = useContext(AssetContext);

  const histories = data?.map((item) => {
    return (
      <Group className={classes.badge} spacing={"0.3rem"}>
        <Text>{item.keyword}</Text>
        <InvisibleButton
          onClick={() => {
            deleteAssetSearchHistory(item.keyword, token).then(() => {
              mutateSearchHistory();
            });
          }}
        >
          <IconX size={"0.8rem"} stroke={1.8} color={theme.colors.teal[1]} />
        </InvisibleButton>
      </Group>
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
            const promises: any[] = [];

            data?.forEach((item) => {
              const request = deleteAssetSearchHistory(item.keyword, token);
              promises.push(request);
            });

            try {
              await Promise.all(promises); // 모든 요청이 종료될 때까지 대기
              mutateSearchHistory();
            } catch (error) {
              console.error("Error in processing requests:", error);
            }
          }}
        >
          <Text>모두 삭제</Text>
        </InvisibleButton>
      </Group>
    </Box>
  );
}
