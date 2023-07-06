import axios, { AxiosRequestConfig } from "axios";

export async function fetcher(url: string, config?: AxiosRequestConfig) {
  const res = await axios.get(url, config);
  return res.data;
}
