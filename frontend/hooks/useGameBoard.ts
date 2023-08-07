import useSWR from "swr";
import useAuth from "./useAuth";
import { fetcher } from "../utils/fetcher";
import { GetGameBoardResponse } from "../types/api/game/gameBoard";

function useGameBoard(gameId: string, boardId: string) {
  const { token } = useAuth();
  const response = useSWR<GetGameBoardResponse>(
    `http://localhost:8000/game/${gameId}/board/${boardId}`,
    (url) => fetcher(url, token)
  );
  return response;
}

export default useGameBoard;
