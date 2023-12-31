import axios from "axios";
import { AssetReviewData } from "./postAssetReview";

export interface PatchAssetReviewReponse {
  assetId: string;
  data: AssetReviewData;
  token?: string;
}

export async function patchAssetReview({
  assetId,
  data,
  token,
}: PatchAssetReviewReponse): Promise<void | undefined> {
  const url = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/asset/${assetId}/review`;
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
