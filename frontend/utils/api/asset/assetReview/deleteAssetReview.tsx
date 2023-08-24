import axios, { AxiosResponse } from "axios";

export default async function deleteAssetReview(
  assetId: string,
  reviewId: string,
  token?: string
): Promise<void> {
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    const response: AxiosResponse = await axios.delete(
      `http://localhost:8000/asset/${assetId}/review/${reviewId}`,
      {
        headers,
      }
    );
  } catch (error) {
    console.error(error);
  }
}
