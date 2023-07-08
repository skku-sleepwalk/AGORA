import axios, { AxiosResponse } from "axios";
import { PostBoardResponse, PostBoardBody } from "../../types/api/boards";

export async function uploadPost(post: PostBoardBody): Promise<PostBoardResponse> {
  const { data } = await axios.post<PostBoardBody, AxiosResponse<PostBoardResponse>>(
    "http://localhost:8000/boards",
    post,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return data;
}
