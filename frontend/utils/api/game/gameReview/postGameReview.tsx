import axios, { AxiosResponse } from "axios";
import { GameReviewResponse } from "../../../../types/api/game/gameReview";

export interface gameReviewData {
  content: string;
  rating: number;
}

export async function PostGameReview(
  postData: gameReviewData,
  gameId: string,
  token?: string
): Promise<GameReviewResponse> {
  const { data } = await axios.post<gameReviewData, AxiosResponse<GameReviewResponse>>(
    `http://localhost:8000/game/${gameId}/review`,
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
