import useSWR from "swr";
import { GetBoardResponse } from "../types/api/boards";
import useAuth from "./useAuth";
import { fetcher } from "../utils/fetcher";

function useBoard(id?: string) {
  const { token } = useAuth();
  const response = useSWR<GetBoardResponse>(
    id ? `http://localhost:8000/community/board/${id}` : null,
    (url) => fetcher(url, token)
  );
  return response;
}

export default useBoard;
