import axios, { AxiosResponse } from "axios";
import { GameReviewResponse } from "../../../../types/api/game/gameReview";

export interface Likes {}

export async function PostGameReviewCommentLike(
  gameId: string,
  reviewId: string,
  commentId: string,
  token?: string
): Promise<GameReviewResponse> {
  const { data } = await axios.post<Likes, AxiosResponse<GameReviewResponse>>(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/game/${gameId}/review/${reviewId}/comment/${commentId}/like`,
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
export async function DelGameReviewCommentLike(
  gameId: string,
  reviewId: string,
  commentId: string,
  token?: string
): Promise<GameReviewResponse> {
  const { data } = await axios.delete<Likes, AxiosResponse<GameReviewResponse>>(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/game/${gameId}/review/${reviewId}/comment/${commentId}/like`,

    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    }
  );
  return data;
}

export async function PostGameReviewCommentDislike(
  gameId: string,
  reviewId: string,
  commentId: string,
  token?: string
): Promise<GameReviewResponse> {
  const { data } = await axios.post<Likes, AxiosResponse<GameReviewResponse>>(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/game/${gameId}/review/${reviewId}/comment/${commentId}/dislike`,
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
export async function DelGameReviewCommentDislike(
  gameId: string,
  reviewId: string,
  commentId: string,
  token?: string
): Promise<GameReviewResponse> {
  const { data } = await axios.delete<Likes, AxiosResponse<GameReviewResponse>>(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/game/${gameId}/review/${reviewId}/comment/${commentId}/dislike`,

    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    }
  );
  return data;
}
