import useSWR from "swr";
import useAuth from "../useAuth";
import { fetcher } from "../../utils/fetcher";
import { GetGameResponse } from "../../types/api/game/game";

function useGame(gameId?: string) {
  const { token } = useAuth();
  const url = `http://localhost:8000/game/${gameId}`;

  const response = useSWR<GetGameResponse>(url, (url) => fetcher(url, token));

  return response;
}

export default useGame;
