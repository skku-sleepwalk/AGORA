import { useMainLayoutStyles } from "./MainLayout.styles";

export interface MainLayoutProps {
  searchSection: React.ReactNode;
  searchRecordSection: React.ReactNode;
  tabSection: React.ReactNode;
  children: React.ReactNode;
  movingUpButtonSection: React.ReactNode;
}

export function MainLayout({
  searchSection,
  searchRecordSection,
  tabSection,
  children,
  movingUpButtonSection,
}: MainLayoutProps) {
  const { classes, cx } = useMainLayoutStyles();

  return (
    <div className={classes.container}>
      <div className={classes.searchcontainer}>{searchSection}</div>
      <div className={classes.searchRecordContainer}>{searchRecordSection}</div>
      <div className={classes.tabContainer}>{tabSection}</div>
      <div className={classes.mainContainer}>{children}</div>
      <div className={classes.movingUpButtonContainer}>{movingUpButtonSection}</div>
    </div>
  );
}
