import { Group, Textarea, useMantineTheme } from "@mantine/core";
import { useGameTextWriterStyles } from "./GameTextWriter.styles";
import { showNotification } from "../../../../utils/notifications";
import { IconSend } from "@tabler/icons-react";
import InvisibleButton from "../../../common/InvisibleButton/InvisibleButton";
import { useMediaQuery } from "@mantine/hooks";
import { useContext, useRef, useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import { patchGameReview } from "../../../../utils/api/game/gameReview/patchGameReview";
import { GameReviewSectionContext } from "../GameReviewSection/GameReviewSection";
import { PostGameReview } from "../../../../utils/api/game/gameReview/postGameReview";
import { PostGameReviewComment } from "../../../../utils/api/game/gameReview/postGameReviewComment";
import { GameReviewContext } from "../GameReviewSection/GameReview/GameReview";
import { GameReviewMineContext } from "../GameReviewSection/GameReviewMine/GameReviewMine";
import { RichTextEditor } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { patchGameReviewComment } from "../../../../utils/api/game/gameReview/patchGameReviewComment";
import { uploadGameBoard } from "../../../../utils/api/game/gameBoard/uploadGameBoard";
import { GameBoardDetailViewerContext } from "../GameBoardSection/GameBoardDetailViewer/GameBoardDetailViewer";

export interface GameTextWriterProps {
  completePatch?: () => void; // PATCH 용
  placeholder: string;
  gameId: string;
  reviewId?: string; // 후기 댓글 POST/PATCH 용
  commentId?: string | undefined; // 후기 댓글 PATCH 용
  content?: string; // 후기 (댓글) PATCH 용
  isInReviewMine?: boolean; // 후기 댓글 (PATCH) 용
  parentBoardId?: string; // 게시판 댓글 POST 용
  parentBoardCategoryNames?: string[]; // 게시판 댓글 POST 용
}

export function GameTextWriter({
  completePatch,
  placeholder,
  gameId,
  reviewId,
  commentId,
  content,
  isInReviewMine,
  parentBoardId,
  parentBoardCategoryNames,
}: GameTextWriterProps) {
  if (parentBoardId && !parentBoardCategoryNames)
    throw new Error("게시판 댓글을 등록하려면 카테고리 이름을 지정해야 합니다.");
  const theme = useMantineTheme();
  const smallScreen = useMediaQuery("(max-width: 765px)");
  const { classes } = useGameTextWriterStyles({ smallScreen });

  const editor = useEditor({
    extensions: [StarterKit, Placeholder.configure({ placeholder: placeholder })],
    content: content ? content : "",
  });

  const { token } = useAuth();
  const { mutateGameReview, mutateGameReviewMine } = useContext(GameReviewSectionContext);
  const { mutategameReviewComment } = useContext(GameReviewContext);
  const { mutategameReviewMineComment } = useContext(GameReviewMineContext);
  const { mutateGameBoardComment } = useContext(GameBoardDetailViewerContext);

  const [textAreaValue, setTextAreaValue] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault(); // 새로고침을 막음
    // 폼이 제출되었을 때 처리할 작업
    if (parentBoardId) {
      uploadGameBoard(
        {
          content: textAreaValue,
          title: "",
          categoryNames: parentBoardCategoryNames!,
          parentId: parentBoardId,
        },
        gameId,
        token
      ).then(() => {
        setTextAreaValue("");
        showNotification("댓글 등록 완료!", "댓글이 정상적으로 등록되었습니다.");
        mutateGameBoardComment();
      });
      return;
    }
    if (commentId && reviewId) {
      // 게임 후기 댓글 PATCH
      patchGameReviewComment({
        gameId: gameId,
        reviewId: reviewId,
        commentId: commentId,
        data: { content: textAreaValue, rating: 0 },
        token: token,
      }).then(() => {
        setTextAreaValue("");
        completePatch !== undefined ? completePatch() : null;
        mutateGameReview();
        if (isInReviewMine) {
          mutateGameReviewMine();
        }
        showNotification("댓글 수정 완료!", "댓글이 정상적으로 수정되었습니다.");
      });
    } else if (content) {
      // 게임 후기 PATCH
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
    } else if (reviewId) {
      // 게임 후기 댓글 POST
      PostGameReviewComment({ content: textAreaValue }, gameId, reviewId, token).then(() => {
        setTextAreaValue("");
        mutategameReviewComment();
        if (isInReviewMine) {
          mutategameReviewMineComment();
        }
        showNotification("댓글 등록 완료!", "댓글이 정상적으로 수정되었습니다.");
      });
    } else {
      // 게임 후기 POST
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
        <RichTextEditor className={classes.editor} editor={editor}>
          <RichTextEditor.Content />
        </RichTextEditor>
        <InvisibleButton
          type="submit"
          onClick={(e) => {
            if (editor!.getHTML() === "<p></p>") {
              showNotification(null, "내용을 입력해 주세요.");
              e.preventDefault();
            } else {
              setTextAreaValue(editor!.getHTML());
              editor!.commands.setContent("");
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
