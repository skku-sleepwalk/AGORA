import axios, { AxiosResponse } from "axios";
import { showError } from "../notifications";
import { PostUploadImageResponse } from "../../types/api/upload";

export async function uploadImage(image: File): Promise<PostUploadImageResponse> {
  const formData = new FormData();
  formData.append("image", image);
  const data = await axios.post<FormData, PostUploadImageResponse>(
    "http://localhost:8000/upload/image",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return data;
}