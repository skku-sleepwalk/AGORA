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
  floatRight: {
    float: "right",
    border: "1px solid red",
    margin: "1em",
    width: "3em",
    height: "2em",
  },
  writebtn: {
    size: "2000em",
  },
}));
