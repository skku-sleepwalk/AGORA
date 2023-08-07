import { useMypageLayoutStyles } from "./mypageLayout.styles";

export interface CommunityLayoutProps {
  userInfoSection?: React.ReactNode;
  anchorSection?: React.ReactNode;
  tabSection?: React.ReactNode;
  children?: React.ReactNode;
}

function MypageLayout({
  userInfoSection,
  anchorSection,
  tabSection,
  children,
}: CommunityLayoutProps) {
  const { classes, cx } = useMypageLayoutStyles();

  return (
    <div className={classes.container}>
      <div className={classes.userInfoContainer}>{userInfoSection}</div>
      <div className={classes.tabBottomContainer}>
        <div className={classes.anchor}>{anchorSection}</div>
        <div className={classes.tabContainer}>{tabSection}</div>
        <div className={classes.bottomContainer}>
          <div className={classes.mainContainer}>{children}</div>
        </div>
      </div>
    </div>
  );
}

export default MypageLayout;
