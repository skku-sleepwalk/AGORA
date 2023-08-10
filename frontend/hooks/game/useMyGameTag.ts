import useSWR from "swr";
import useAuth from "../useAuth";
import { fetcher } from "../../utils/fetcher";
import { GameTagResponse } from "../../types/api/game/gameTag";

export function useMyGameTag(gameId: string) {
  const { token } = useAuth();
  const url = `http://localhost:8000/game/${gameId}/tag`;

  const response = useSWR<GameTagResponse>(url, (url) => fetcher(url, token));

  return response;
}
