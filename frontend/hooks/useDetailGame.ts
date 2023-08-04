import useSWR from "swr";
import { GameStore } from "../types/api/store";

function useDetailGame(id?: string) {
  const response = useSWR<GameStore>(id ? `http://localhost:8000/game/${id}` : null);
  return response;
}

export default useDetailGame;

// export function useDetailGameReview(id?: string) {
//   const response = useSWR<GameStore>(id ? `http://localhost:8000/game/${id}` : null);
//   return response;
// }
