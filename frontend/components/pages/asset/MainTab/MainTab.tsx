import { Box, Button, Group } from "@mantine/core";
import { useMainTabStyles } from "./MainTab.styles";
import { useEffect, useState } from "react";

export const sectionData = ["All", "3D", "2D", "Add-on", "Tool", "Code", "Music"];

export interface MainTabProps {
  onTabChange: (section: string) => void;
  MovingUp: () => void;
  scrollY: number;
}

export function MainTab({ onTabChange, MovingUp, scrollY }: MainTabProps) {
  const { classes, cx } = useMainTabStyles();
  const [activeTab, setActiveTab] = useState("3D");

  useEffect(() => {
    onTabChange(activeTab);
  }, [activeTab]);

  const sections = sectionData.map((item) => {
    return (
      <Button
        className={cx(activeTab === item && classes.buttonOn)}
        variant="default"
        color="teal"
        radius="xl"
        onClick={() => {
          setActiveTab(item);
          MovingUp();
        }}
      >
        {item}
      </Button>
    );
  });

  return (
    <Box className={cx(classes.wrapper, scrollY > 4 * 16 && classes.shadow)}>
      <Group className={classes.group} position="apart">
        <Group spacing={"sm"}>{sections}</Group>
        {/* <Button
          className={classes.buttonOn}
          variant="default"
          color="teal"
          radius="xl"
          fw={"normal"}
        >
          에셋 업로드
        </Button> */}
      </Group>
    </Box>
  );
}
