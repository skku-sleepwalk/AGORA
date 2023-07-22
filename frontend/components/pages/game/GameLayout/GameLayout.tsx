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
  const [scroll, scrollTo] = useWindowScroll();

  // tap을 조건에 따라 고정하기 위해서
  const heightRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>(600);
  useEffect(() => {
    if (heightRef.current) {
      setHeight(heightRef.current.clientHeight);
    }
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.topContainer}>
        <div className={classes.PhotoContainer}>{photoSection}</div>
        <div className={classes.infoContainer}>{InfoSection}</div>
      </div>
      <div className={cx(scroll.y <= height ? classes.tapContainer_S : classes.tapContainer_F)}>
        {tapSection}
      </div>
      <div className={cx(classes.bottomContainer, scroll.y <= height ? null : classes.paddingTop)}>
        <div className={cx(smallScreen ? classes.mainContainer_S : classes.mainContainer_B)}>
          {children}
        </div>
        <div className={cx(smallScreen ? classes.rightContainer_S : classes.rightContainer_B)}>
          {rightSection}
        </div>
      </div>
    </div>
  );
}

export default GameLayout;
