import { ComponentPropsWithoutRef, useState } from "react";
import { useInterval } from "@mantine/hooks";
import { Button, Progress } from "@mantine/core";
import { useButtonProgressStyles } from "./ButtonProgress.styles";

export interface ButtonProgressProps extends ComponentPropsWithoutRef<"button"> {
  CloseModal: () => void;
}

export function ButtonProgress({ CloseModal, ...others }: ButtonProgressProps) {
  const { classes, theme } = useButtonProgressStyles();
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);

  return (
    <Button
      className={classes.button}
      //   setLoaded(false) <--원래 null자리
      color={loaded ? "teal" : theme.primaryColor}
      {...others}
    >
      <div className={classes.label}>{"글 작성"}</div>
      {progress !== 0 && (
        <Progress
          value={progress}
          color={theme.fn.rgba(theme.colors[theme.primaryColor][2], 0.35)}
          radius="sm"
        />
      )}
    </Button>
  );
}
