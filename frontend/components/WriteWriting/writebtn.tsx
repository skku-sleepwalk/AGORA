import { useState } from "react";
import { useInterval } from "@mantine/hooks";
import { createStyles, Button, Progress } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
const useStyles = createStyles((theme) => ({
  button: {
    position: "relative",
    transition: "background-color 150ms ease",
  },

  progress: {
    ...theme.fn.cover(-1),
    height: "auto",
    backgroundColor: "transparent",
    zIndex: 0,
  },

  label: {
    position: "relative",
    zIndex: 1,
  },
}));
export interface ButtonProgressProps {
  CloseModal: () => void;
}
export function ButtonProgress({ CloseModal }: ButtonProgressProps) {
  //   const [opened, { open, close }] = useDisclosure(false);
  const { classes, theme } = useStyles();
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
      fullWidth
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
