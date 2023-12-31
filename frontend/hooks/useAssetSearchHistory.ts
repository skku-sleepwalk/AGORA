import useSWR from "swr";
import useAuth from "./useAuth";
import { fetcher } from "../utils/fetcher";
import { GetAssetSearchHistoryResponse } from "../types/api/asset";

export function useAssetSearchHistory() {
  const { token } = useAuth();
  const url = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/asset/searchHistory`;

  const response = useSWR<GetAssetSearchHistoryResponse>(url, (url) => fetcher(url, token));

  return response;
}
