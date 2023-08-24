import useSWR from "swr";
import useAuth from "./useAuth";
import { AssetTagResponse } from "../types/api/asset";
import { fetcher } from "../utils/fetcher";

export function useAssetTag(searchKeyword: string | null) {
  const { token } = useAuth();
  const url = `http://localhost:8000/game/tag/search?q=${searchKeyword}`;

  const response = useSWR<AssetTagResponse>(url, (url) => fetcher(url, token));

  return response;
}
