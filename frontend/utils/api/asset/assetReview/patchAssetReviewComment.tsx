import axios from "axios";
import { AssetReviewData } from "./postAssetReview";

export interface patchAssetReviewCommentResponse {
  assetId: string;
  reviewId: string;
  commentId: string;
  data: AssetReviewData;
  token?: string;
}

export async function patchAssetReviewComment({
  assetId,
  reviewId,
  commentId,
  data,
  token,
}: patchAssetReviewCommentResponse): Promise<void | undefined> {
  const url = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/asset/${assetId}/review/${reviewId}/comment/${commentId}`;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `${token}`,
  };

  try {
    const response = await axios.patch(url, data, { headers });
    return response.data;
  } catch (error) {
    throw error;
  }
}
