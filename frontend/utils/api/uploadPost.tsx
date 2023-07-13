import axios, { AxiosResponse } from "axios";
import { PostBoardResponse, PostBoardBody } from "../../types/api/boards";
import useAuth from "../../hooks/useAuth";

export async function uploadPost(post: PostBoardBody, token?: string): Promise<PostBoardResponse> {
  const { data } = await axios.post<PostBoardBody, AxiosResponse<PostBoardResponse>>(
    "http://localhost:8000/developer-community-boards",
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
