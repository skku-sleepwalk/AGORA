import useSWR from "swr";
import useAuth from "./useAuth";
import { MyAssetTagResponse } from "../types/api/asset";
import { fetcher } from "../utils/fetcher";

export function useMyAssetTag(assetId: string) {
  const { token } = useAuth();
  const url = `http://localhost:8000/asset/${assetId}/tag`;

  const response = useSWR<MyAssetTagResponse>(url, (url) => fetcher(url, token));

  return response;
}
