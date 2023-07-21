import { useGameLayoutStyles } from "./GameLayout.styles";

export interface CommunityLayoutProps {
  children?: React.ReactNode;
  tapSection?: React.ReactNode;
  rightSection?: React.ReactNode;
}

function GameLayout({ children, tapSection, rightSection }: CommunityLayoutProps) {
  const { classes } = useGameLayoutStyles();

  return (
    <div className={classes.container}>
      <div className={classes.tapContainer}>{tapSection}</div>
      <div className={classes.rightMainContainer}>
        <div className={classes.mainContainer}>{children}</div>
        <div className={classes.rightContainer}>{rightSection}</div>
      </div>
    </div>
  );
}

export default GameLayout;
