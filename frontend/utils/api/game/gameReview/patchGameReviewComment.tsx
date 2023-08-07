import axios from "axios";
import { gameReviewData } from "./postGameReview";

export interface patchGameReviewCommentResponse {
  gameId: string;
  reviewId: string;
  commentId: string;
  data: gameReviewData;
  token?: string;
}

export async function patchGameReviewComment({
  gameId,
  reviewId,
  commentId,
  data,
  token,
}: patchGameReviewCommentResponse): Promise<void | undefined> {
  const url = `http://localhost:8000/game/${gameId}/review/${reviewId}/comment/${commentId}`; // PATCH 요청을 보낼 엔드포인트 URL
  const headers = {
    "Content-Type": "application/json", // 요청의 콘텐츠 유형 지정
    Authorization: `${token}`,
  };

  try {
    const response = await axios.patch(url, data, { headers });
    return response.data;
  } catch (error) {
    throw error;
  }
}
