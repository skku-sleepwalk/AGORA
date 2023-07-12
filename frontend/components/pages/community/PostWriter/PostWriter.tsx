import { Avatar, FocusTrap, Group, ScrollArea, Stack } from "@mantine/core";
import { TextInput } from "@mantine/core";
import { Modal } from "@mantine/core";
import { useDisclosure, useMediaQuery, useSetState } from "@mantine/hooks";
import { useWriteWritingStyles } from "./PostWriter.styles";
import CardContainer from "../../../common/CardContainer/CardContainer";
import UserInfo from "../../../common/UserInfo/UserInfo";
import { MOCKUP_USER } from "../../../../mockups/user";
import RichEditor from "./RichEditor/RichEditor";
import { ButtonProgress } from "./ButtonProgress/ButtonProgress";
import CategorySelector from "./CategorySelector/CategorySelector";
import { useForm } from "@mantine/form";
import { useContext, useRef } from "react";
import { Editor } from "@tiptap/react";
import { uploadPost } from "../../../../utils/api/uploadPost";
import { showNotification } from "../../../../utils/notifications";
import { CommunityContext } from "../../../../pages/community";

export interface Post {
  title: string;
  content: string;
  category: string[];
}

function PostWriter() {
  const { classes } = useWriteWritingStyles();
  const [opened, { open, close }] = useDisclosure(false);
  const isMobile = useMediaQuery("(max-width: 50em)");
  const form = useForm({
    initialValues: {
      title: "",
      category: [] as string[],
    },
  });
  const editorRef = useRef<Editor>(null);
  const { mutatePost } = useContext(CommunityContext);

  return (
    <>
      <CardContainer className={classes.container}>
        <Avatar
          className={classes.avatarInWriting}
          radius="xl"
          size={46}
          src={"https://avatars.githubusercontent.com/u/52057157?v=4"}
        />

        <TextInput
          placeholder="새로운 글을 작성해보세요."
          pos={"relative"}
          onFocus={(e) => {
            e.currentTarget.blur();
            open();
          }}
          className={classes.TextInput}
          value={form.values.title}
          readOnly
        />
      </CardContainer>
      <Modal
        opened={opened}
        onClose={close}
        fullScreen={isMobile}
        className={classes.editorModal}
        size="auto"
        scrollAreaComponent={ScrollArea.Autosize}
        centered
        keepMounted
      >
        <form
          onSubmit={form.onSubmit((values) => {
            const content = editorRef.current!.getHTML();
            const postData = {
              ...values,
              content,
            };

            uploadPost({
              title: postData.title,
              content: postData.content,
              writerEmail: "qazxsw100415@gmail.com",
              categoryNames: postData.category,
            }).then(() => {
              close();
              showNotification("업로드 완료", "게시물이 성공적으로 게시되었습니다.");
              mutatePost();
            });
          })}
        >
          <FocusTrap active={opened}>
            <Stack className={classes.editorContainer} spacing={17}>
              <UserInfo user={MOCKUP_USER} />
              <TextInput
                placeholder="멋진 제목을 입력해주세요."
                data-autofocus
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                  }
                }}
                {...form.getInputProps("title")}
              />
              <RichEditor ref={editorRef} />
              <CategorySelector
                onChange={(category) => {
                  form.setFieldValue("category", category);
                }}
              />
              <Group position="right">
                <ButtonProgress CloseModal={close} type="submit" />
              </Group>
            </Stack>
          </FocusTrap>
        </form>
      </Modal>
    </>
  );
}
export default PostWriter;
