import axios, { AxiosResponse } from "axios";
import { AssetReviewResponse } from "../../../../types/api/asset";

export interface AssetReviewData {
  content: string;
  rating: number;
}

export async function PostAssetReview(
  postData: AssetReviewData,
  assetId: string,
  token?: string
): Promise<AssetReviewResponse> {
  const { data } = await axios.post<AssetReviewData, AxiosResponse<AssetReviewResponse>>(
    `http://localhost:8000/asset/${assetId}/review`,
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
