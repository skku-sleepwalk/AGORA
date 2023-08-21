import { Group, Textarea, useMantineTheme } from "@mantine/core";
import { useAssetTextWriterStyles } from "./AssetTextWriter.styles";
import { showNotification } from "../../../../utils/notifications";
import { IconSend } from "@tabler/icons-react";
import InvisibleButton from "../../../common/InvisibleButton/InvisibleButton";
import { useMediaQuery } from "@mantine/hooks";
import { useContext, useRef, useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import { patchGameReview } from "../../../../utils/api/game/gameReview/patchGameReview";
import { PostGameReview } from "../../../../utils/api/game/gameReview/postGameReview";
import { PostGameReviewComment } from "../../../../utils/api/game/gameReview/postGameReviewComment";
import { RichTextEditor } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { patchGameReviewComment } from "../../../../utils/api/game/gameReview/patchGameReviewComment";
import { uploadGameBoard } from "../../../../utils/api/game/gameBoard/uploadGameBoard";
import { editGameBoard } from "../../../../utils/api/game/gameBoard/editGameBoard";
import { AssetReviewSectionContext } from "../AssetReviewSection/AssetReviewSection";
import { AssetReviewContext } from "../AssetReviewSection/AssetReview/AssetReview";
import { AssetReviewMineContext } from "../AssetReviewSection/AssetReviewMine/AssetReviewMine";

export interface AssetTextWriter {
  completePatch?: () => void; // PATCH 용
  placeholder: string;
  gameId: string;
  reviewId?: string; // 후기 댓글 POST/PATCH 용
  commentId?: string | undefined; // 후기 댓글 PATCH 용
  content?: string; // 후기 (댓글) PATCH 용
  isInReviewMine?: boolean; // 후기 댓글 (PATCH) 용
  parentBoardId?: string; // 게시판 댓글 POST 용
  parentBoardCategoryNames?: string[]; // 게시판 댓글 POST 용
  boardId?: string; // 게시판 PATCH 용
}

export function AssetTextWriter({
  completePatch,
  placeholder,
  gameId,
  reviewId,
  commentId,
  content,
  isInReviewMine,
  parentBoardId,
  parentBoardCategoryNames,
  boardId,
}: AssetTextWriter) {
  if (parentBoardId && !parentBoardCategoryNames)
    throw new Error("게시판 댓글을 등록하려면 카테고리 이름을 지정해야 합니다.");
  const theme = useMantineTheme();
  const smallScreen = useMediaQuery("(max-width: 765px)");
  const { classes } = useAssetTextWriterStyles({ smallScreen });
  const { token, openSignInModal, user } = useAuth();

  const editor = useEditor({
    extensions: [StarterKit, Placeholder.configure({ placeholder: placeholder })],
    content: content ? content : "",
  });

  const { mutateAssetReview, mutateAssetReviewMine } = useContext(AssetReviewSectionContext);
  const { mutateAssetReviewComment } = useContext(AssetReviewContext);
  const { mutateAssetReviewMineComment } = useContext(AssetReviewMineContext);

  const [textAreaValue, setTextAreaValue] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault(); // 새로고침을 막음
    // 폼이 제출되었을 때 처리할 작업
    if (parentBoardId && !boardId) {
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
    } else if (boardId) {
      editGameBoard(
        {
          content: textAreaValue,
          title: "",
          categoryNames: parentBoardCategoryNames!,
        },
        gameId,
        boardId,
        token
      ).then(() => {
        setTextAreaValue("");
        showNotification("댓글 수정 완료!", "댓글이 정상적으로 수정되었습니다.");
        completePatch?.();
      });
    } else if (commentId && reviewId) {
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
        mutateAssetReview();
        if (isInReviewMine) {
          mutateAssetReviewMine();
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
        mutateAssetReview();
        mutateAssetReviewMine();
        showNotification("후기 수정 완료!", "후기가 정상적으로 수정되었습니다.");
      });
    } else if (reviewId) {
      // 게임 후기 댓글 POST
      PostGameReviewComment({ content: textAreaValue }, gameId, reviewId, token).then(() => {
        setTextAreaValue("");
        mutateAssetReviewComment();
        if (isInReviewMine) {
          mutateAssetReviewMineComment();
        }
        showNotification("댓글 등록 완료!", "댓글이 정상적으로 수정되었습니다.");
      });
    } else {
      // 게임 후기 POST
      PostGameReview({ content: textAreaValue, rating: 5 }, gameId, token).then(() => {
        setTextAreaValue("");
        mutateAssetReview();
        mutateAssetReviewMine();
        showNotification("후기 등록 완료!", "후기가 정상적으로 등록되었습니다.");
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Group className={classes.group}>
        <RichTextEditor
          className={classes.editor}
          editor={editor}
          onFocus={(e) => {
            if (!user) {
              openSignInModal();
              (e.currentTarget.querySelector("div[contenteditable='true']") as HTMLElement).blur();
            }
          }}
        >
          <RichTextEditor.Content />
        </RichTextEditor>
        <InvisibleButton
          type="submit"
          onClick={(e) => {
            if (!user) {
              openSignInModal();
              e.preventDefault();
              return;
            }

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
