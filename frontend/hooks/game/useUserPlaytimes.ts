import useSWR from "swr";
import { fetcher } from "../../utils/fetcher";
import { User } from "../../types/api/user";
import useAuth from "../useAuth";

export interface UserPlaytimesResponse {
  data: User;
}

export function useUserPlaytimes() {
  const { user, token } = useAuth();
  const url = `http://localhost:8000/users/${user?.id}`;

  const response = useSWR<UserPlaytimesResponse>(url, (url) => fetcher(url, token));

  return response;
}