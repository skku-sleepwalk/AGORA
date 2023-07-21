import { useMainLayoutStyles } from "./MainLayout.styles";

export interface CommunityLayoutProps {
  children?: React.ReactNode;
  tapSection?: React.ReactNode;
  upSection?: React.ReactNode;
}

function MainLayout({ children, tapSection, upSection }: CommunityLayoutProps) {
  const { classes } = useMainLayoutStyles();

  return (
    <div className={classes.container}>
      <div className={classes.tapContainer}>{tapSection}</div>
      <div className={classes.upContainer}>{upSection}</div>
      <div className={classes.mainContainer}>{children}</div>
    </div>
  );
}

export default MainLayout;
