import { useMediaQuery } from "@mantine/hooks";
import { useGameLayoutStyles } from "./GameLayout.styles";

export interface CommunityLayoutProps {
  photoSection?: React.ReactNode;
  summarySection?: React.ReactNode;
  tapSection?: React.ReactNode;
  children?: React.ReactNode;
  rightSection?: React.ReactNode;
}

function GameLayout({
  photoSection,
  summarySection,
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
        <div className={classes.summaryContainer}>{summarySection}</div>
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
