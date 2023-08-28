import axios, { AxiosResponse } from "axios";
import { PostGameBoardBody } from "../../../../types/api/game/gameBoard";

export async function uploadGameBoard(
  post: PostGameBoardBody,
  gameId: string,
  token?: string
): Promise<void> {
  await axios.post<PostGameBoardBody, AxiosResponse<void>>(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/game/${gameId}/board`,
    post,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    }
  );
  return Promise.resolve();
}
