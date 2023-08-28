import axios, { AxiosResponse } from "axios";
import { PostBoardResponse, PostBoardBody } from "../../types/api/boards";
import useAuth from "../../hooks/useAuth";

export async function uploadPost(post: PostBoardBody, token?: string): Promise<PostBoardResponse> {
  const { data } = await axios.post<PostBoardBody, AxiosResponse<PostBoardResponse>>(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/community/board`,
    post,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    }
  );
  return data;
}
