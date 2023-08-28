import axios, { AxiosResponse } from "axios";

export async function deleteGameBoard(
  gameId: string,
  boardId: string,
  token?: string
): Promise<void> {
  await axios.delete<AxiosResponse<void>>(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/game/${gameId}/board/${boardId}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    }
  );
  return Promise.resolve();
}
