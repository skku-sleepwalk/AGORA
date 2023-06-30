import { Button, Group, Menu, NativeSelect, Stack, Tabs } from "@mantine/core";
import { useSearchTabStyles } from "./SearchTab.styles";
import { useState } from "react";
import { IconAdjustmentsHorizontal } from "@tabler/icons-react";

export interface SearchTabProps {
  className?: string;
  postTab: React.ReactNode;
  commentTab: React.ReactNode;
}

function SearchTab({ className, postTab, commentTab }: SearchTabProps) {
  const { classes, cx } = useSearchTabStyles();
  const [tab, setTab] = useState<string | null>("post");

  return (
    <Tabs value={tab} onTabChange={setTab} className={className}>
      <Tabs.List>
        <Group position="apart" className={classes.tabList} noWrap>
          <Group spacing={0} noWrap>
            <Tabs.Tab
              value="post"
              className={cx(classes.tabItem, tab === "post" && classes.tabItemActive)}
            >
              게시글
            </Tabs.Tab>
            <Tabs.Tab
              value="comment"
              className={cx(classes.tabItem, tab === "comment" && classes.tabItemActive)}
            >
              댓글
            </Tabs.Tab>
          </Group>
          <Menu closeOnItemClick={false} position="right-start">
            <Menu.Target>
              <Button leftIcon={<IconAdjustmentsHorizontal />} className={classes.settingButton}>
                검색 설정
              </Button>
            </Menu.Target>
            <Menu.Dropdown className={classes.dropdown}>
              <Group spacing={10}>
                <NativeSelect
                  data={["최신순", "조회순"]}
                  label="정렬 순서"
                  className={classes.settingItem}
                />
                <NativeSelect
                  data={["전체", "최근 1일", "최근 1주", "최근 1개월", "최근 1년"]}
                  label="기간"
                  className={classes.settingItem}
                />
              </Group>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Tabs.List>

      <Tabs.Panel value="post">{postTab}</Tabs.Panel>

      <Tabs.Panel value="comment">{commentTab}</Tabs.Panel>
    </Tabs>
  );
}

export default SearchTab;
