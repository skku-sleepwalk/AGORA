import axios, { AxiosResponse } from "axios";

export default async function deleteGameReviewComment(
  gameId: string,
  reviewId: string,
  commentId: string,
  token?: string
): Promise<void> {
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    const response: AxiosResponse = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/game/${gameId}/review/${reviewId}/comment/${commentId}`,
      {
        headers,
      }
    );
  } catch (error) {
    console.error(error);
  }
}
