import axios, { AxiosResponse } from "axios";
import { GameLikeResponse } from "../../../../types/api/game/game";

export interface Likes {}

export async function PostGameLike(gameId: string, token?: string): Promise<GameLikeResponse> {
  const { data } = await axios.post<Likes, AxiosResponse<GameLikeResponse>>(
    `http://localhost:8000/game/${gameId}/like`,
    {},
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    }
  );
  return data;
}
export async function DelGameLike(gameId: string, token?: string): Promise<GameLikeResponse> {
  const { data } = await axios.delete<Likes, AxiosResponse<GameLikeResponse>>(
    `http://localhost:8000/game/${gameId}/like`,

    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    }
  );
  return data;
}
