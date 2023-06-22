import { Container } from "@mantine/core";
import { Avatar } from "@mantine/core";
import { TextInput } from "@mantine/core";
import { Modal, Button } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { useWriteWritingStyles } from "./WriteWriting.styles";

function WriteWriting() {
  const { classes } = useWriteWritingStyles();
  const [opened, { open, close }] = useDisclosure(false);
  const isMobile = useMediaQuery("(max-width: 50em)");
  // function textfocused(e: any) {
  //   // focused event 발생시 실행
  //   console.log(1);
  //   return 0;
  // }
  return (
    <Container className={classes.container}>
      <Modal
        opened={opened}
        onClose={close}
        title="글쓰기 창"
        fullScreen={isMobile}
        transitionProps={{ transition: "fade", duration: 200 }}
      >
        여기에 글을 써봅시다.
      </Modal>

      <Avatar
        src={"https://avatars.githubusercontent.com/u/52057157?v=4"}
        radius="xl"
        size={30}
        display={"inline-block"}
        // pos={"relative"}
        left={150}
        top={70}
      />

      <TextInput
        placeholder="새로운 글을 작성해보세요."
        display={"inline-block"}
        left={160}
        top={60}
        pos={"relative"}
        onClick={open}
        className={classes.TextInput}
        // variant="filled"

        //게시 버튼까지
      />
    </Container>
  );
}
export default WriteWriting;
