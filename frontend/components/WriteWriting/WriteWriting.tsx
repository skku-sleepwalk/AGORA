// import { Container } from "@mantine/core";
import { Avatar } from "@mantine/core";
import { TextInput } from "@mantine/core";
import { Modal, Button } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { useWriteWritingStyles } from "./WriteWriting.styles";
import RichEditor from "./RichEditor";
import { ButtonProgress } from "./writebtn";
import CardContainer from "../common/CardContainer/CardContainer";

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
    <CardContainer className={classes.container}>
      <Modal
        opened={opened}
        onClose={close}
        title="글쓰기 창"
        fullScreen={isMobile}
        transitionProps={{ transition: "fade", duration: 200 }}
      >
        <RichEditor />

        <br></br>
        <ButtonProgress CloseModal={close} />
      </Modal>

      <Avatar
        className={classes.avatarInWriting}
        radius="xl"
        size={30}
        src={"https://avatars.githubusercontent.com/u/52057157?v=4"}
      />

      <TextInput
        placeholder="새로운 글을 작성해보세요."
        display={"inline-block"}
        // left={160}
        // top={60}
        pos={"relative"}
        onClick={open}
        className={classes.TextInput}
        // variant="filled"

        //게시 버튼까지
      />
    </CardContainer>
  );
}
export default WriteWriting;
