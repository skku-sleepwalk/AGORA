import axios, { AxiosResponse } from "axios";

export default async function deleteAssetSearchHistory(
  keyword: string,
  token?: string
): Promise<void> {
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    const response: AxiosResponse = await axios.delete(
      `http://localhost:8000/asset/search/history/${keyword}`,
      {
        headers,
      }
    );
  } catch (error) {
    console.error(error);
  }
}
