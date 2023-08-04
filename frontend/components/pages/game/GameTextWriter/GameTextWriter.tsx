import { Group, Textarea, useMantineTheme } from "@mantine/core";
import { useGameTextWriterStyles } from "./GameTextWriter.styles";
import { showNotification } from "../../../../utils/notifications";
import { IconSend } from "@tabler/icons-react";
import InvisibleButton from "../../../common/InvisibleButton/InvisibleButton";
import { useMediaQuery } from "@mantine/hooks";
import { useState } from "react";
import { uploadReview } from "../../../../hooks/useGameReview";
import useAuth from "../../../../hooks/useAuth";

export function HandleText(text: string): string {
  // 정규식을 사용하여 줄바꿈 문자를 <br> 태그로 바꿉니다.
  const handledText = text.replace(/(\n|\r\n)/g, "<br>");

  return handledText;
}

export interface shortenTextProps {
  text: string;
  length: number;
}

export function ShortenText({ text, length }: shortenTextProps): [string, boolean] {
  if (text.length <= length) {
    return [text, false];
  }

  const lines = text.split("<br/>"); // br 태그를 기준으로 문자열을 split
  let shortenedText = "";
  let currentLength = 0;

  for (const line of lines) {
    if (line.length + currentLength <= length) {
      // 현재 줄에 더해서 제한 글자 수를 넘지 않으면 해당 줄을 그대로 추가
      shortenedText += line + "<br/>";
      currentLength += line.length;
    } else {
      // 현재 줄에 더해서 제한 글자 수를 넘어가면 일부만 추가 (br태그가 끊기지 않도록 중간에 -5 실행)
      const remainLength = length - currentLength - 5;
      if (remainLength > 0) {
        shortenedText += line.substring(0, remainLength);
      }

      break; // 제한 글자 수로 맞춤
    }
  }

  return [shortenedText + "...", true];
}

export interface GameTextWriterProps {
  onSaveClick?: () => void;
  placeholder: string;
  id: string;
}

export function GameTextWriter({ onSaveClick, placeholder, id }: GameTextWriterProps) {
  const theme = useMantineTheme();

  const smallScreen = useMediaQuery("(max-width: 765px)");
  const { classes } = useGameTextWriterStyles({ smallScreen });
  const [textAreaValue, setTextAreaValue] = useState("");
  const { token } = useAuth();
  const handleSubmit = (event: any) => {
    event.preventDefault();
    // 여기에서 폼이 제출되었을 때 처리할 작업을 수행합니다.

    uploadReview({ content: textAreaValue, rating: 5 }, id, token);
    // 예시로 콘솔에 textarea의 값만 출력하도록 했습니다.
    // 폼 제출 후 다른 작업을 수행하고 싶다면 여기에 코드를 추가하면 됩니다.
    console.log("Textarea value:", textAreaValue);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Group className={classes.group}>
        <Textarea
          id="Textarea"
          className={classes.textarea}
          size={smallScreen ? "xs" : "sm"}
          value={textAreaValue}
          onChange={(event) => setTextAreaValue(event.target.value)}
          placeholder={placeholder}
          autosize
          minRows={1}
        />
        <InvisibleButton
          type="submit"
          onClick={() => {
            const Textarea = document.getElementById("Textarea") as HTMLTextAreaElement;
            const inputText: string = Textarea.value;
            if (inputText === "") {
              showNotification(null, "내용을 입력해 주세요.");
            } else {
              // 꼭 HandleText 함수 실행 후에 서버에 저장할 것!
              // setTextAreaValue(HandleText(inputText));
              //왜필요한지 모르겠어서 지움

              onSaveClick !== undefined ? onSaveClick() : null;
            }
          }}
        >
          <IconSend
            className={classes.sendIcon}
            size={smallScreen ? "1.5rem" : "2rem"}
            stroke={1}
            color={theme.colors.gray[7]}
          />
        </InvisibleButton>
      </Group>
    </form>
  );
}
