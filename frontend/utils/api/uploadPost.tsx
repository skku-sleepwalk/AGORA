import axios, { AxiosResponse } from "axios";
import { PostBoardResponse } from "../../types/api/boards";

export async function uploadPost(Post: File): Promise<PostBoardResponse> {
  //기존 promise 함수의 제네릭을 사용!
  const formData = new FormData(); //일종의 form이다.
  formData.append("Post", Post); //form 안에 key"Post" value Post 넣을거임!
  const { data } = await axios.post<FormData, AxiosResponse<PostBoardResponse>>(
    "http://localhost:8000/boards/Post", //URL
    formData, //data
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    } //config
  );
  return data;
}
