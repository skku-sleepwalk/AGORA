import axios, { AxiosResponse } from "axios";
import { showError } from "../notifications";
import { PostUploadImageResponse } from "../../types/api/upload";

export async function uploadImage(image: File): Promise<PostUploadImageResponse> {
  const formData = new FormData();
  formData.append("image", image);
  const { data } = await axios.post<FormData, AxiosResponse<PostUploadImageResponse>>(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/upload/image`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return data;
}
