import axios, { AxiosRequestConfig } from "axios";
import useAuth from "../hooks/useAuth";

export async function fetcher(url: string, token?: string, config?: AxiosRequestConfig) {
  const res = await axios.get(url, {
    ...config,
    headers: {
      ...config?.headers,
      Authorization: `${token}`,
    },
  });
  return res.data;
}
