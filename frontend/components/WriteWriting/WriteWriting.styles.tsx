import { TextInput, createStyles } from "@mantine/core";

export const useWriteWritingStyles = createStyles((theme) => ({
  container: {
    height: "80%",
    // backgroundColor: 'red'
  },
  TextInput: {
    // onkeyup: enterkey(Event),
    width: 495,
  },
  erase: {
    display: "none",
  },
}));
