import { useMediaQuery } from "@mantine/hooks";
import { useGameLayoutStyles } from "./GameLayout.styles";
import { ScrollArea } from "@mantine/core";

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
          <ScrollArea
            type="never"
            className={cx(smallScreen ? classes.scrollContainer_S : classes.scrollContainer_B)}
          >
            <div className={classes.mainContainer}>{children}</div>
          </ScrollArea>
          <div className={cx(smallScreen ? classes.rightContainer_S : classes.rightContainer_B)}>
            {rightSection}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameLayout;
