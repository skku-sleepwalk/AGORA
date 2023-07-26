import { useMediaQuery, useWindowScroll } from "@mantine/hooks";
import { useGameLayoutStyles } from "./GameLayout.styles";
import { useEffect, useRef, useState } from "react";

export interface CommunityLayoutProps {
  photoSection?: React.ReactNode;
  InfoSection?: React.ReactNode;
  tapSection?: React.ReactNode;
  children?: React.ReactNode;
  rightSection?: React.ReactNode;
}

function GameLayout({
  photoSection,
  InfoSection,
  tapSection,
  children,
  rightSection,
}: CommunityLayoutProps) {
  const { classes, cx } = useGameLayoutStyles();
  const smallScreen = useMediaQuery("(max-width: 780px)");

  return (
    <div className={classes.container}>
      <div className={classes.topContainer}>
        <div className={classes.PhotoContainer}>{photoSection}</div>
        <div className={classes.infoContainer}>{InfoSection}</div>
      </div>
      <div className={classes.tapBottomContainer}>
        <div className={classes.tapContainer}>{tapSection}</div>
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
