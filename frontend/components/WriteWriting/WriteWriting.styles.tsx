import { TextInput, createStyles } from "@mantine/core";

export const useWriteWritingStyles = createStyles((theme) => ({
  container: {
    height: "10% ",
    display: "flex",
    // backgroundColor: 'red'
    overflow: "hidden",
  },

  TextInput: {
    // onkeyup: enterkey(Event),
    float: "left",
    width: 495,
    // left: 160,
    // top: 60,
  },
  erase: {
    display: "none",
  },
  avatarInWriting: {
    display: "inline-block",
    pos: "relative",
    // left: 150,
    // top: 60,
  },
}));
