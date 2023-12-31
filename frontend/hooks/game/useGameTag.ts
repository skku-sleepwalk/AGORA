import useSWR from "swr";
import useAuth from "../useAuth";
import { fetcher } from "../../utils/fetcher";
import { GameTagResponse } from "../../types/api/game/gameTag";

export function useGameTag(searchKeyword: string | null) {
  const { token } = useAuth();
  const url = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/game/tag/search?q=${searchKeyword}`;

  const response = useSWR<GameTagResponse>(url, (url) => fetcher(url, token));

  return response;
}
