import useSWR from "swr";
import useAuth from "./useAuth";
import { fetcher } from "../utils/fetcher";
import { MyAssetReviewResponse } from "../types/api/asset";

export function useMyAssetReview(assetId: string) {
  const { token } = useAuth();
  const url = `http://localhost:8000/asset/${assetId}/review/user`;

  const response = useSWR<MyAssetReviewResponse>(url, (url) => fetcher(url, token));

  return response;
}
