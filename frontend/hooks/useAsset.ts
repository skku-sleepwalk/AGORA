import useSWR from "swr";
import useAuth from "./useAuth";
import { GetAssetResponse } from "../types/api/asset";
import { fetcher } from "../utils/fetcher";

function useAsset(gameId?: string) {
  const { token } = useAuth();
  const url = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/asset/${gameId}`;

  const response = useSWR<GetAssetResponse>(url, (url) => fetcher(url, token));

  return response;
}

export default useAsset;
