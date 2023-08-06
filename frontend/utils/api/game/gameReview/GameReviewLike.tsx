import axios, { AxiosResponse } from "axios";
import { GameReviewResponse } from "../../../../types/api/game/gameReview";

export interface Likes {}

export async function PostGameReviewLike(
  gameId: string,
  reviewId: string,
  token?: string
): Promise<GameReviewResponse> {
  const { data } = await axios.post<Likes, AxiosResponse<GameReviewResponse>>(
    `http://localhost:8000/game/${gameId}/review/${reviewId}/like`,
    {},
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    }
  );
  return data;
}
export async function DelGameReviewLike(
  gameId: string,
  reviewId: string,
  token?: string
): Promise<GameReviewResponse> {
  const { data } = await axios.delete<Likes, AxiosResponse<GameReviewResponse>>(
    `http://localhost:8000/game/${gameId}/review/${reviewId}/like`,

    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    }
  );
  return data;
}

export async function PostGameReviewDislike(
  gameId: string,
  reviewId: string,
  token?: string
): Promise<GameReviewResponse> {
  const { data } = await axios.post<Likes, AxiosResponse<GameReviewResponse>>(
    `http://localhost:8000/game/${gameId}/review/${reviewId}/dislike`,
    {},
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    }
  );
  return data;
}
export async function DelGameReviewDislike(
  gameId: string,
  reviewId: string,
  token?: string
): Promise<GameReviewResponse> {
  const { data } = await axios.delete<Likes, AxiosResponse<GameReviewResponse>>(
    `http://localhost:8000/game/${gameId}/review/${reviewId}/dislike`,

    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    }
  );
  return data;
}
