import axios from "axios";

export function createGameBoardLike(gameId: string, boardId: string, token?: string) {
  const url = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/game/${gameId}/board/${boardId}/like`;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `${token}`,
  };

  return axios.post(url, {}, { headers });
}

export function deleteGameBoardLike(gameId: string, boardId: string, token?: string) {
  const url = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/game/${gameId}/board/${boardId}/like`;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `${token}`,
  };

  return axios.delete(url, { headers });
}
