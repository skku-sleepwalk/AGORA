import axios, { AxiosResponse } from "axios";
import { AssetReviewResponse } from "../../../../types/api/asset";

export interface AssetReviewCommentData {
  content: string;
}

export async function PostAssetReviewComment(
  postData: AssetReviewCommentData,
  assetId: string,
  reviewId: string,
  token?: string
): Promise<AssetReviewResponse> {
  const { data } = await axios.post<AssetReviewCommentData, AxiosResponse<AssetReviewResponse>>(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/asset/${assetId}/review/${reviewId}/comment`,
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
