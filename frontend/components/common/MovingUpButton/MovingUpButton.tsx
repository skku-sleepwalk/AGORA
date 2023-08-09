import { UnstyledButton } from "@mantine/core";
import { useMovingUpButtonStyles } from "./MovingUpButton.styles";
import { IconArrowBarToUp } from "@tabler/icons-react";

export interface MovingUpButtonProps {
  MovingUp: () => void;
  scrollY: number;
}

export function MovingUpButton({ MovingUp, scrollY }: MovingUpButtonProps) {
  const { classes, cx } = useMovingUpButtonStyles();

  return (
    <UnstyledButton
      className={cx(classes.button, scrollY === 0 && classes.displayNone)}
      onClick={MovingUp}
    >
      <IconArrowBarToUp stroke={1.3} />
    </UnstyledButton>
  );
}
