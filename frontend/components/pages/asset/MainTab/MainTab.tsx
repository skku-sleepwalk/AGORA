import { Box, Button, Group } from "@mantine/core";
import { useMainTabStyles } from "./MainTab.styles";
import { useState } from "react";

export interface MainTabProps {
  MovingUp: () => void;
  scrollY: number;
}

export function MainTab({ MovingUp, scrollY }: MainTabProps) {
  const { classes, cx } = useMainTabStyles();
  const [acticeTab, setActiveTab] = useState("");

  const sectionData = ["3D", "2D", "Add-on", "Music"];
  const sections = sectionData.map((item) => {
    return (
      <Button
        className={cx(acticeTab === item && classes.buttonOn)}
        variant="default"
        color="teal"
        radius="xl"
        onClick={() => {
          if (acticeTab === item) {
            setActiveTab("");
          } else {
            setActiveTab(item);
          }
          MovingUp();
        }}
      >
        {item}
      </Button>
    );
  });

  return (
    <Box className={cx(classes.wrapper, scrollY > 4 * 16 && classes.shadow)}>
      <Group className={classes.group}>{sections}</Group>
    </Box>
  );
}
