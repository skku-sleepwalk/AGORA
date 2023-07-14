import { Box, Button, Collapse, Group, NativeSelect, Tabs } from "@mantine/core";
import { useSearchTabStyles } from "./SearchTab.styles";
import { useState } from "react";
import { IconAdjustmentsHorizontal, IconMessage, IconNote } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";

export interface SearchTabProps {
  className?: string;
  onChange?: (tab: string) => void;
}

function SearchTab({ className, onChange }: SearchTabProps) {
  const { classes, cx } = useSearchTabStyles();
  const [tab, setTab] = useState<string | null>("post");
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <Tabs
      value={tab}
      onTabChange={(tabName) => {
        setTab(tabName);
        onChange?.(tabName as string);
      }}
      className={className}
    >
      <Tabs.List>
        <Group position="apart" className={classes.tabList} noWrap>
          <Group spacing={0} noWrap>
            <Tabs.Tab
              value="post"
              icon={<IconNote/>}
              className={cx(classes.tabItem, tab === "post" && classes.tabItemActive)}
            >
              게시글
            </Tabs.Tab>
            <Tabs.Tab
              value="comment"
              icon={<IconMessage/>}
              className={cx(classes.tabItem, tab === "comment" && classes.tabItemActive)}
            >
              댓글
            </Tabs.Tab>
          </Group>
          <Box>
            <Group position='right'>
            <Button
              onClick={toggle}
              leftIcon={<IconAdjustmentsHorizontal/>} 
              className={classes.settingButton}>
              검색 설정
            </Button>
            </Group>
            <Collapse in={opened} className={classes.marginTop}>
              <Group spacing={10}>
                <NativeSelect
                  data={["최신순", "조회순"]}
                  label="정렬 순서"
                  className={classes.settingItem}
                  variant="filled"
                />
                <NativeSelect
                  data={["전체", "최근 1일", "최근 1주", "최근 1개월", "최근 1년"]}
                  label="기간"
                  className={classes.settingItem}
                  variant="filled"
                />
              </Group>
            </Collapse>
          </Box>
        </Group>
      </Tabs.List>
    </Tabs>
  );
}

export default SearchTab;
