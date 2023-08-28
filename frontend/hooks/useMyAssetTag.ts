import useSWR from "swr";
import useAuth from "./useAuth";
import { MyAssetTagResponse } from "../types/api/asset";
import { fetcher } from "../utils/fetcher";

export function useMyAssetTag(assetId: string) {
  const { token } = useAuth();
  const url = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/asset/${assetId}/tag`;

  const response = useSWR<MyAssetTagResponse>(url, (url) => fetcher(url, token));

  return response;
}
