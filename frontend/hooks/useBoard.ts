import useSWR from "swr";
import { GetBoardResponse } from "../types/api/boards";

function useBoard(id?: string) {
  const response = useSWR<GetBoardResponse>(
    id ? `http://localhost:8000/developer-community-boards/id/${id}` : null
  );
  return response;
}

export default useBoard;
