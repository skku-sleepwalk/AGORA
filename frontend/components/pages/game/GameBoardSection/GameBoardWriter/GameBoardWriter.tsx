import { Box, FocusTrap, Group, Stack, TextInput } from "@mantine/core";
import RichEditor from "../../../community/PostWriter/RichEditor/RichEditor";
import { ButtonProgress } from "../../../community/PostWriter/ButtonProgress/ButtonProgress";
import { useRef, useState } from "react";
import { Editor } from "@tiptap/react";
import { useGameBoardWriterStyles } from "./GameBoardWriter.styles";
import { CustomNativeSelect } from "../../../../common/CustomNativeSelect/CustomNativeSelect";

export interface GameBoardWriterProps {
  opened: boolean;
  close: () => void;
}

export function GameBoardWriter({ opened, close }: GameBoardWriterProps) {
  const { classes, cx } = useGameBoardWriterStyles();

  // 카테고리 관련
  const isDeveloper = true;
  const developerData = ["공지사항", "업데이트", "개발일지", "리뷰", "공략", "뻘글"];
  const userData = ["리뷰", "공략", "뻘글"];
  const [sectionValue, setSectionValue] = useState(isDeveloper ? developerData[0] : userData[0]);

  const editorRef = useRef<Editor>(null);

  return (
    <FocusTrap active={opened}>
      <Stack className={classes.editorContainer} spacing={17}>
        {/* <form onSubmit={form.onSubmit((values) => {
            const content = editorRef.current!.getHTML();
            const postData = {
              ...values,
              content,
            };> */}
        <Group align="flex-end">
          <TextInput
            className={classes.title}
            placeholder="멋진 제목을 입력해주세요."
            data-autofocus
          />
          <CustomNativeSelect
            data={isDeveloper ? developerData : userData}
            defaultValue={sectionValue}
            height="2.375rem"
            onChange={(value) => {
              setSectionValue(value);
            }}
          />
        </Group>
        {/* </form> */}
        <RichEditor content={""} ref={editorRef} />
        <Group position="right">
          <ButtonProgress CloseModal={close} text="게시글 작성" type="submit" />
        </Group>
      </Stack>
    </FocusTrap>
  );
}
