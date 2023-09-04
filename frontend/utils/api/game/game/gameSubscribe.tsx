import axios, { AxiosResponse } from "axios";

export interface PostGameSubscribeProps {
  time: number;
  duration: number;
}

export async function PostGameSubscribe(
  userId: string | undefined,
  body: PostGameSubscribeProps
): Promise<null> {
  const { data } = await axios.post<PostGameSubscribeProps, AxiosResponse<null>>(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/users/${userId}/subscribe`,
    { body },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return data;
}
