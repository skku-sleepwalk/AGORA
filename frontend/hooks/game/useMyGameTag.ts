import useSWR from "swr";
import useAuth from "../useAuth";
import { fetcher } from "../../utils/fetcher";
import { MyGameTagResponse } from "../../types/api/game/gameTag";

export function useMyGameTag(gameId: string) {
  const { token } = useAuth();
  const url = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/game/${gameId}/tag`;

  const response = useSWR<MyGameTagResponse>(url, (url) => fetcher(url, token));

  return response;
}
