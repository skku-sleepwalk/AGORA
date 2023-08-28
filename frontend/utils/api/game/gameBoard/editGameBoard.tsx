import axios, { AxiosResponse } from "axios";
import { PatchGameBoardBody } from "../../../../types/api/game/gameBoard";

export async function editGameBoard(
  post: PatchGameBoardBody,
  gameId: string,
  boardId: string,
  token?: string
): Promise<void> {
  await axios.patch<PatchGameBoardBody, AxiosResponse<void>>(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/game/${gameId}/board/${boardId}`,
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
