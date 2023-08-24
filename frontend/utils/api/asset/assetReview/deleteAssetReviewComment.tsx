import axios, { AxiosResponse } from "axios";

export default async function deleteAssetReviewComment(
  assetId: string,
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
      `http://localhost:8000/asset/${assetId}/review/${reviewId}/comment/${commentId}`,
      {
        headers,
      }
    );
  } catch (error) {
    console.error(error);
  }
}
