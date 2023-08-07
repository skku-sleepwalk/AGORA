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
import useAuth from "../../../../hooks/useAuth";
import { useState } from "react";

export interface Post {
  title: string;
  content: string;
  category: string[];
}

function PostWriter() {
  const { classes } = useWriteWritingStyles();
  const [opened, { open, close }] = useDisclosure(false);
  const isMobile = useMediaQuery("(max-width: 50em)");
  const [content, setcontent] = useState("");
  const [title, settitle] = useState("");
  const form = useForm({
    initialValues: {
      title: title,
      category: [] as string[],
    },
  });
  const editorRef = useRef<Editor>(null);
  const { mutatePost } = useContext(CommunityContext);
  const { token } = useAuth();
  const [isKeepMounted, setIsKeepMounted] = useState(true);
  const [categorychanged, setcategorychange] = useState(false);
  const { user } = useAuth();
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
            setIsKeepMounted(true);
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
        keepMounted={isKeepMounted}
      >
        <form
          onSubmit={form.onSubmit((values) => {
            const content = editorRef.current!.getHTML();
            const postData = {
              ...values,
              content,
            };
            if (categorychanged === false || postData.category.length === 0) {
              showNotification("카테고리 없음", "카테고리를 1개 이상 추가해주세요.");
            } else if (postData.content === "<p></p>") {
              showNotification("본문 없음", "본문 내용을 추가해주세요.");
            } else if (postData.title === "") {
              showNotification("제목 없음", "제목을 추가해주세요.");
            } else {
              uploadPost(
                {
                  title: postData.title,
                  content: postData.content,
                  categoryNames: postData.category,
                },
                token
              ).then(() => {
                form.setFieldValue("title", "");
                setIsKeepMounted(false);
                close();
                showNotification("업로드 완료", "게시물이 성공적으로 게시되었습니다.");
                mutatePost();
                setcategorychange(false);
              });
            }
          })}
        >
          <FocusTrap active={opened}>
            <Stack className={classes.editorContainer} spacing={17}>
              <UserInfo user={user!} />
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
              <RichEditor content={content} ref={editorRef} />
              <CategorySelector
                onChange={(category) => {
                  form.setFieldValue("category", category);
                  setcategorychange(true);
                }}
              />
              <Group position="right">
                <ButtonProgress CloseModal={close} text="글 작성" type="submit" />
              </Group>
            </Stack>
          </FocusTrap>
        </form>
      </Modal>
    </>
  );
}
export default PostWriter;
