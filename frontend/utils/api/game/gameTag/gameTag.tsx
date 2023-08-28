import axios, { AxiosResponse } from "axios";
import { GameTagName, PostGameTagResponse } from "../../../../types/api/game/gameTag";

export async function PostGameTag(
  gameId: string,
  tagName: GameTagName,
  token?: string
): Promise<PostGameTagResponse> {
  const { data } = await axios.post<GameTagName, AxiosResponse<PostGameTagResponse>>(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/game/${gameId}/tag`,
    tagName,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    }
  );
  return data;
}

export default async function deleteGameTag(
  gameId: string,
  relationId: string,
  token?: string
): Promise<void> {
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    const response: AxiosResponse = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/game/${gameId}/tag/${relationId}`,
      {
        headers,
      }
    );
  } catch (error) {
    console.error(error);
  }
}
