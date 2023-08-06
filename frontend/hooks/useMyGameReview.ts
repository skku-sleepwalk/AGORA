import useSWR from "swr";
import { MyGameReviewResponse } from "../types/api/game/gameReview";
import useAuth from "./useAuth";
import { fetcher } from "../utils/fetcher";

export function useMyGameReview(gameId: string) {
  const { token } = useAuth();
  const url = `http://localhost:8000/game/${gameId}/review/user`;

  const response = useSWR<MyGameReviewResponse>(url, (url) => fetcher(url, token));

  return response;
}
