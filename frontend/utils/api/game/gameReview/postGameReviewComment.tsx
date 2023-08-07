import axios, { AxiosResponse } from "axios";
import { GameReviewResponse } from "../../../../types/api/game/gameReview";

export interface gameReviewCommentData {
  content: string;
}

export async function PostGameReviewComment(
  postData: gameReviewCommentData,
  gameId: string,
  reviewId: string,
  token?: string
): Promise<GameReviewResponse> {
  const { data } = await axios.post<gameReviewCommentData, AxiosResponse<GameReviewResponse>>(
    `http://localhost:8000/game/${gameId}/review/${reviewId}/comment`,
    postData,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    }
  );
  return data;
}
