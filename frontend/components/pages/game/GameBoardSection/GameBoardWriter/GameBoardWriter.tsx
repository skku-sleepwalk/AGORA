import { Box, FocusTrap, Group, Stack, TextInput } from "@mantine/core";
import RichEditor from "../../../community/PostWriter/RichEditor/RichEditor";
import { ButtonProgress } from "../../../community/PostWriter/ButtonProgress/ButtonProgress";
import { useRef, useState } from "react";
import { Editor } from "@tiptap/react";
import { useGameBoardWriterStyles } from "./GameBoardWriter.styles";
import { CustomNativeSelect } from "../../../../common/CustomNativeSelect/CustomNativeSelect";
import { uploadGameBoard } from "../../../../../utils/api/game/gameBoard/uploadGameBoard";
import useAuth from "../../../../../hooks/useAuth";
import { useForm } from "@mantine/form";
import { showNotification } from "../../../../../utils/notifications";
import { editGameBoard } from "../../../../../utils/api/game/gameBoard/editGameBoard";

export interface GameBoardWriterProps {
  opened: boolean;
  gameId: string;
  developerId: string;
  close: () => void;
  fullWidth?: boolean;
  editProps?: {
    title: string;
    content: string;
    category: string[];
    boardId: string;
  };
}

export function GameBoardWriter({
  opened,
  gameId,
  developerId,
  close,
  fullWidth,
  editProps,
}: GameBoardWriterProps) {
  const { classes, cx } = useGameBoardWriterStyles({ fullWidth });
  const { user, token } = useAuth();

  // 카테고리 관련
  const developerData = ["공지사항", "업데이트", "개발일지", "리뷰", "공략", "뻘글"];
  const userData = ["리뷰", "공략", "뻘글"];
  const [sectionValue, setSectionValue] = useState(
    developerId === user?.id ? developerData[0] : userData[0]
  );
  const form = useForm({
    initialValues: {
      title: editProps ? editProps.title : "",
      category: editProps ? editProps.category : ([] as string[]),
    },
  });

  const editorRef = useRef<Editor>(null);

  return (
    <FocusTrap active={opened}>
      <form
        onSubmit={form.onSubmit((values) => {
          const content = editorRef.current!.getHTML();
          const postData = {
            title: values.title,
            content: content,
            categoryNames: [sectionValue],
          };
          console.log("postData", postData);
          if (editProps) {
            editGameBoard(postData, gameId, editProps.boardId, token).then(() => {
              showNotification("수정 완료", "게시물이 성공적으로 수정되었습니다.");
              close();
            });
          } else {
            uploadGameBoard(postData, gameId, token).then(() => {
              showNotification("업로드 완료", "게시물이 성공적으로 게시되었습니다.");
              close();
            });
          }
        })}
      >
        <Stack className={classes.editorContainer} spacing={17}>
          <Group align="flex-end">
            <TextInput
              className={classes.title}
              placeholder="멋진 제목을 입력해주세요."
              {...form.getInputProps("title")}
              data-autofocus
            />
            <CustomNativeSelect
              data={developerId === user?.id ? developerData : userData}
              defaultValue={sectionValue}
              height="2.375rem"
              onChange={(value) => {
                setSectionValue(value);
              }}
            />
          </Group>
          <RichEditor content={editProps ? editProps.content : ""} ref={editorRef} />
          <Group position="right">
            <ButtonProgress
              CloseModal={close}
              text={editProps ? "게시글 수정" : "게시글 작성"}
              type="submit"
            />
          </Group>
        </Stack>
      </form>
    </FocusTrap>
  );
}
