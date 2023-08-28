import axios, { AxiosResponse } from "axios";

export default async function deleteGameReview(
  gameId: string,
  reviewId: string,
  token?: string
): Promise<void> {
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    const response: AxiosResponse = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/game/${gameId}/review/${reviewId}`,
      {
        headers,
      }
    );
  } catch (error) {
    console.error(error);
  }
}
