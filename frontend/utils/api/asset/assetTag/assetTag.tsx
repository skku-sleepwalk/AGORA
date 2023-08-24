import axios, { AxiosResponse } from "axios";
import { AssetTagName, PostAssetTagResponse } from "../../../../types/api/asset";

export async function PostAssetTag(
  assetId: string,
  tagName: AssetTagName,
  token?: string
): Promise<PostAssetTagResponse> {
  const { data } = await axios.post<AssetTagName, AxiosResponse<PostAssetTagResponse>>(
    `http://localhost:8000/asset/${assetId}/tag`,
    tagName,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    }
  );
  return data;
}

export default async function deleteAssetTag(
  assetId: string,
  relationId: string,
  token?: string
): Promise<void> {
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    const response: AxiosResponse = await axios.delete(
      `http://localhost:8000/asset/${assetId}/tag/${relationId}`,
      {
        headers,
      }
    );
  } catch (error) {
    console.error(error);
  }
}
