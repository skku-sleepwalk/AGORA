import { Group, Textarea, useMantineTheme } from "@mantine/core";
import { useGameTextWriterStyles } from "./GameTextWriter.styles";
import { showNotification } from "../../../../utils/notifications";
import { IconSend } from "@tabler/icons-react";
import InvisibleButton from "../../../common/InvisibleButton/InvisibleButton";
import { useMediaQuery } from "@mantine/hooks";
import { useContext, useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import { patchGameReview } from "../../../../utils/api/game/gameReview/patchGameReview";
import { GameReviewSectionContext } from "../GameReviewSection/GameReviewSection";
import { PostGameReview } from "../../../../utils/api/game/gameReview/postGameReview";
import { PostGameReviewComment } from "../../../../utils/api/game/gameReview/postGameReviewComment";
import { GameReviewContext } from "../GameReviewSection/GameReview/GameReview";
import { GameReviewMineContext } from "../GameReviewSection/GameReviewMine/GameReviewMine";

export function HandleText(text: string): string {
  // 정규식을 사용하여 줄바꿈 문자를 <br> 태그로 바꿉니다.
  const handledText = text.replace(/(\n|\r\n)/g, "<br>");

  return handledText;
}

export interface GameTextWriterProps {
  completePatch?: () => void;
  placeholder: string;
  gameId: string;
  commentId?: string | undefined; // 후기 댓글 용
  authorEmail?: string; // 후기 댓글 용
  content?: string; // PATCH 용
}

export function GameTextWriter({
  completePatch,
  placeholder,
  gameId,
  commentId,
  authorEmail,
  content,
}: GameTextWriterProps) {
  const theme = useMantineTheme();

  const smallScreen = useMediaQuery("(max-width: 765px)");
  const { classes } = useGameTextWriterStyles({ smallScreen });

  const { token } = useAuth();
  const { mutateGameReview, mutateGameReviewMine } = useContext(GameReviewSectionContext);
  const { mutategameReviewComment } = useContext(GameReviewContext);
  const { mutategameReviewMineComment } = useContext(GameReviewMineContext);

  const [textAreaValue, setTextAreaValue] = useState(content ? content : "");

  const handleSubmit = (event: any) => {
    event.preventDefault();
    // 여기에서 폼이 제출되었을 때 처리할 작업을 수행합니다.
    if (content) {
      // 게임 리뷰 PATCH
      patchGameReview({
        gameId: gameId,
        data: { content: textAreaValue, rating: 0 },
        token: token,
      }).then(() => {
        setTextAreaValue("");
        completePatch !== undefined ? completePatch() : null;
        mutateGameReview();
        mutateGameReviewMine();
        showNotification("후기 수정 완료!", "후기가 정상적으로 수정되었습니다.");
      });
    } else if (commentId) {
      // 게임 리뷰 댓글 POST
      PostGameReviewComment({ content: textAreaValue }, gameId, commentId, token).then(() => {
        setTextAreaValue("");
        mutategameReviewComment();
        if (authorEmail === token) {
          mutategameReviewMineComment();
        }
        showNotification("댓글 등록 완료!", "댓글이 정상적으로 수정되었습니다.");
      });
    } else {
      // 게임 리뷰 POST
      PostGameReview({ content: textAreaValue, rating: 5 }, gameId, token).then(() => {
        setTextAreaValue("");
        mutateGameReview();
        mutateGameReviewMine();
        showNotification("후기 등록 완료!", "후기가 정상적으로 등록되었습니다.");
      });
    }
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
              setTextAreaValue(HandleText(inputText));
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
