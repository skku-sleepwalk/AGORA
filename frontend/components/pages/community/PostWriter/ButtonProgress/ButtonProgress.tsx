import { useState } from "react";
import { useInterval } from "@mantine/hooks";
import { Button, Progress } from "@mantine/core";
import { useButtonProgressStyles } from "./ButtonProgress.styles";

export interface ButtonProgressProps {
  CloseModal: () => void;
}

export function ButtonProgress({ CloseModal }: ButtonProgressProps) {
  const { classes, theme } = useButtonProgressStyles();
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const interval = useInterval(
    () =>
      setProgress((current) => {
        if (current < 100) {
          return current + 1;
        }

        interval.stop();
        setLoaded(true);
        return 0;
      }),
    20
  );

  return (
    <Button
      className={classes.button}
      onClick={() => (loaded ? CloseModal() : !interval.active && interval.start())}
      //   setLoaded(false) <--원래 null자리
      color={loaded ? "teal" : theme.primaryColor}
    >
      <div className={classes.label}>
        {progress !== 0 ? "글 업로드 중" : loaded ? "업로드 완료!" : "글 작성"}
      </div>
      {progress !== 0 && (
        <Progress
          value={progress}
          className={classes.progress}
          color={theme.fn.rgba(theme.colors[theme.primaryColor][2], 0.35)}
          radius="sm"
        />
      )}
    </Button>
  );
}
