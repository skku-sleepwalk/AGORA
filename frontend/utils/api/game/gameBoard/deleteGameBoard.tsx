import axios, { AxiosResponse } from "axios";

export async function deleteGameBoard(
  gameId: string,
  boardId: string,
  token?: string
): Promise<void> {
  await axios.delete<AxiosResponse<void>>(`http://localhost:8000/game/${gameId}/board/${boardId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
  });
  return Promise.resolve();
}
