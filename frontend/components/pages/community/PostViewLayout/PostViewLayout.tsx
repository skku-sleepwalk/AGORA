import { Container, Group } from "@mantine/core";
import { usePostViewLayoutStyles } from "./PostViewLayout.styles";

export interface CommunityLayoutProps {
  children: React.ReactNode;
  rightSection: React.ReactNode;
}

function PostViewLayout({ children, rightSection }: CommunityLayoutProps) {
  const { classes } = usePostViewLayoutStyles();

  return (
    <div className={classes.container}>
      <div className={classes.mainContainer}>{children}</div>
      <div className={classes.rightContainer}>{rightSection}</div>
    </div>
  );
}

export default PostViewLayout;
