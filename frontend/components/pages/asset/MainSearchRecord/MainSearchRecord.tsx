import { Box, Group, Text, useMantineTheme } from "@mantine/core";
import { useMainSearchRecordStyles } from "./MainSearchRecord.styles";
import InvisibleButton from "../../../common/InvisibleButton/InvisibleButton";
import { IconX } from "@tabler/icons-react";

export function MainSearchRecord() {
  const { classes, cx } = useMainSearchRecordStyles();
  const theme = useMantineTheme();

  const recordData = ["일러스트", "UI", "버튼", "픽셀"];

  const records = recordData.map((item) => {
    return (
      <Group className={classes.badge} spacing={"0.3rem"}>
        <Text>{item}</Text>
        <InvisibleButton>
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
          {records}
        </Group>
        <InvisibleButton className={cx(classes.badge, classes.badgeBg)}>
          <Text>모두 삭제</Text>
        </InvisibleButton>
      </Group>
    </Box>
  );
}
