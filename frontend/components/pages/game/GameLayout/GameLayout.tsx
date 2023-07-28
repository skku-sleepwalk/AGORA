import { useMediaQuery } from "@mantine/hooks";
import { useGameLayoutStyles } from "./GameLayout.styles";
import { useRef } from "react";

export interface CommunityLayoutProps {
  photoSection?: React.ReactNode;
  summarySection?: React.ReactNode;
  anchorSection?: React.ReactNode;
  tabSection?: React.ReactNode;
  children?: React.ReactNode;
  rightSection?: React.ReactNode;
}

function GameLayout({
  photoSection,
  summarySection,
  anchorSection,
  tabSection,
  children,
  rightSection,
}: CommunityLayoutProps) {
  const { classes, cx } = useGameLayoutStyles();
  const smallScreen = useMediaQuery("(max-width: 780px)");

  return (
    <div className={classes.container}>
      <div className={classes.topContainer}>
        <div className={classes.PhotoContainer}>{photoSection}</div>
        <div className={classes.summaryContainer}>{summarySection}</div>
      </div>
      <div className={classes.tabBottomContainer}>
        <div className={classes.anchor}>{anchorSection}</div>
        <div className={classes.tabContainer}>{tabSection}</div>
        <div className={classes.bottomContainer}>
          <div className={cx(smallScreen ? classes.mainContainer_S : classes.mainContainer_B)}>
            {children}
          </div>
          <div className={cx(smallScreen ? classes.rightContainer_S : classes.rightContainer_B)}>
            {rightSection}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameLayout;
