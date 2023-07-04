import { Container, Group } from "@mantine/core";
import { useCommunityLayoutStyles } from "./CommunityLayout.styles";

export interface CommunityLayoutProps {
  children: React.ReactNode;
  leftSection?: React.ReactNode;
  rightSection: React.ReactNode;
}

function CommunityLayout({ children, leftSection, rightSection }: CommunityLayoutProps) {
  const { classes } = useCommunityLayoutStyles();

  return (
    <div className={classes.container}>
      <div className={classes.leftMainContainer}>
        <div className={classes.leftContainer}>{leftSection}</div>
        <div className={classes.mainContainer}>{children}</div>
      </div>
      <div className={classes.rightContainer}>{rightSection}</div>
    </div>
  );
}

export default CommunityLayout;
