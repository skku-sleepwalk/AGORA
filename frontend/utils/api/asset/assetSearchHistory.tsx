import axios, { AxiosResponse } from "axios";
import { PostAssetSearch } from "../../../types/api/asset";

export async function PostAssetSearchHistory(
  keyword: PostAssetSearch,
  token?: string
): Promise<null> {
  const { data } = await axios.post<PostAssetSearch, AxiosResponse<null>>(
    `http://localhost:8000/asset/searchHistory`,
    keyword,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    }
  );
  return data;
}

export async function deleteAssetSearchHistory(keyword: string, token?: string): Promise<void> {
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    const response: AxiosResponse = await axios.delete(
      `http://localhost:8000/asset/searchHistory/${keyword}`,
      {
        headers,
      }
    );
  } catch (error) {
    console.error(error);
  }
}

export async function deleteAllAssetSearchHistory(token?: string): Promise<void> {
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    const response: AxiosResponse = await axios.delete(
      `http://localhost:8000/asset/searchHistory`,
      {
        headers,
      }
    );
  } catch (error) {
    console.error(error);
  }
}
