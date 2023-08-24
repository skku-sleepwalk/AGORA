import axios, { AxiosResponse } from "axios";
import { AssetLikeResponse } from "../../../../types/api/asset";

export interface Likes {}

export async function PostAssetLike(assetId: string, token?: string): Promise<AssetLikeResponse> {
  const { data } = await axios.post<Likes, AxiosResponse<AssetLikeResponse>>(
    `http://localhost:8000/asset/${assetId}/like`,
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
export async function DelAssetLike(assetId: string, token?: string): Promise<AssetLikeResponse> {
  const { data } = await axios.delete<Likes, AxiosResponse<AssetLikeResponse>>(
    `http://localhost:8000/asset/${assetId}/like`,

    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    }
  );
  return data;
}
