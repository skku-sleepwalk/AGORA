import { Group, Textarea, useMantineTheme } from "@mantine/core";
import { useAssetTextWriterStyles } from "./AssetTextWriter.styles";
import { showNotification } from "../../../../utils/notifications";
import { IconSend } from "@tabler/icons-react";
import InvisibleButton from "../../../common/InvisibleButton/InvisibleButton";
import { useMediaQuery } from "@mantine/hooks";
import { useContext, useRef, useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import { RichTextEditor } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { AssetReviewSectionContext } from "../AssetReviewSection/AssetReviewSection";
import { AssetReviewContext } from "../AssetReviewSection/AssetReview/AssetReview";
import { AssetReviewMineContext } from "../AssetReviewSection/AssetReviewMine/AssetReviewMine";
import { patchAssetReviewComment } from "../../../../utils/api/asset/assetReview/patchAssetReviewComment";
import { patchAssetReview } from "../../../../utils/api/asset/assetReview/patchAssetReview";
import { PostAssetReviewComment } from "../../../../utils/api/asset/assetReview/postAssetReviewComment";
import { PostAssetReview } from "../../../../utils/api/asset/assetReview/postAssetReview";

export interface AssetTextWriter {
  completePatch?: () => void; // PATCH 용
  placeholder: string;
  assetId: string;
  reviewId?: string; // 후기 댓글 POST/PATCH 용
  commentId?: string | undefined; // 후기 댓글 PATCH 용
  content?: string; // 후기 (댓글) PATCH 용
  isInReviewMine?: boolean; // 후기 댓글 (PATCH) 용
}

export function AssetTextWriter({
  completePatch,
  placeholder,
  assetId,
  reviewId,
  commentId,
  content,
  isInReviewMine,
}: AssetTextWriter) {
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
    if (commentId && reviewId) {
      // 게임 후기 댓글 PATCH
      patchAssetReviewComment({
        assetId,
        reviewId,
        commentId,
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
      patchAssetReview({
        assetId,
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
      PostAssetReviewComment({ content: textAreaValue }, assetId, reviewId, token).then(() => {
        setTextAreaValue("");
        mutateAssetReviewComment();
        if (isInReviewMine) {
          mutateAssetReviewMineComment();
        }
        showNotification("댓글 등록 완료!", "댓글이 정상적으로 수정되었습니다.");
      });
    } else {
      // 게임 후기 POST
      PostAssetReview({ content: textAreaValue, rating: 5 }, assetId, token).then(() => {
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
