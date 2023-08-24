import axios, { AxiosResponse } from "axios";
import { AssetReviewResponse } from "../../../../types/api/asset";

export interface Likes {}

export async function PostAssetReviewLike(
  assetId: string,
  reviewId: string,
  token?: string
): Promise<AssetReviewResponse> {
  const { data } = await axios.post<Likes, AxiosResponse<AssetReviewResponse>>(
    `http://localhost:8000/asset/${assetId}/review/${reviewId}/like`,
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
export async function DelAssetReviewLike(
  assetId: string,
  reviewId: string,
  token?: string
): Promise<AssetReviewResponse> {
  const { data } = await axios.delete<Likes, AxiosResponse<AssetReviewResponse>>(
    `http://localhost:8000/asset/${assetId}/review/${reviewId}/like`,

    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    }
  );
  return data;
}

export async function PostAssetReviewDislike(
  assetId: string,
  reviewId: string,
  token?: string
): Promise<AssetReviewResponse> {
  const { data } = await axios.post<Likes, AxiosResponse<AssetReviewResponse>>(
    `http://localhost:8000/asset/${assetId}/review/${reviewId}/dislike`,
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
export async function DelAssetReviewDislike(
  assetId: string,
  reviewId: string,
  token?: string
): Promise<AssetReviewResponse> {
  const { data } = await axios.delete<Likes, AxiosResponse<AssetReviewResponse>>(
    `http://localhost:8000/asset/${assetId}/review/${reviewId}/dislike`,

    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    }
  );
  return data;
}
