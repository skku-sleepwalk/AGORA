import axios, { AxiosResponse } from "axios";
import { AssetReviewResponse } from "../../../../types/api/asset";

export interface Likes {}

export async function PostAssetReviewCommentLike(
  assetId: string,
  reviewId: string,
  commentId: string,
  token?: string
): Promise<AssetReviewResponse> {
  const { data } = await axios.post<Likes, AxiosResponse<AssetReviewResponse>>(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/asset/${assetId}/review/${reviewId}/comment/${commentId}/like`,
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
export async function DelAssetReviewCommentLike(
  assetId: string,
  reviewId: string,
  commentId: string,
  token?: string
): Promise<AssetReviewResponse> {
  const { data } = await axios.delete<Likes, AxiosResponse<AssetReviewResponse>>(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/asset/${assetId}/review/${reviewId}/comment/${commentId}/like`,

    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    }
  );
  return data;
}

export async function PostAssetReviewCommentDislike(
  assetId: string,
  reviewId: string,
  commentId: string,
  token?: string
): Promise<AssetReviewResponse> {
  const { data } = await axios.post<Likes, AxiosResponse<AssetReviewResponse>>(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/asset/${assetId}/review/${reviewId}/comment/${commentId}/dislike`,
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
export async function DelAssetReviewCommentDislike(
  assetId: string,
  reviewId: string,
  commentId: string,
  token?: string
): Promise<AssetReviewResponse> {
  const { data } = await axios.delete<Likes, AxiosResponse<AssetReviewResponse>>(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/asset/${assetId}/review/${reviewId}/comment/${commentId}/dislike`,

    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    }
  );
  return data;
}
