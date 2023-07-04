import { Center, UnstyledButton, UnstyledButtonProps } from "@mantine/core";
import { useInvisibleButtonStyles } from "./InvisibleButton.styles";
import { ComponentProps, ComponentPropsWithoutRef } from "react";

export interface TransparentButtonProps
  extends UnstyledButtonProps,
    ComponentPropsWithoutRef<"button"> {
  children: React.ReactNode;
  className?: string;
  center?: boolean;
}

function InvisibleButton({
  children,
  className,
  center = true,
  ...others
}: TransparentButtonProps) {
  const { classes, cx } = useInvisibleButtonStyles();

  return (
    <UnstyledButton className={cx(classes.button, className)} {...others}>
      {center ? <Center>{children}</Center> : children}
    </UnstyledButton>
  );
}

export default InvisibleButton;
