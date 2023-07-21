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
  const { classes } = useGameLayoutStyles();

  return (
    <div className={classes.container}>
      <div className={classes.topContainer}>
        <div className={classes.PhotoContainer}>{photoSection}</div>
        <div className={classes.summaryContainer}>{summarySection}</div>
      </div>
      <div className={classes.tapContainer}>{tapSection}</div>
      <div className={classes.bottomContainer}>
        <div className={classes.mainContainer}>{children}</div>
        <div className={classes.rightContainer}>{rightSection}</div>
      </div>
    </div>
  );
}

export default GameLayout;
