import { GetReviewListResponse, ReviewResponse } from "../types/api/store";
import useSWRInfinite from "swr/infinite";
import { stringify } from "querystring";
import { fetcher } from "../utils/fetcher";
import useAuth from "./useAuth";
import axios, { AxiosResponse } from "axios";
//사실 지금 이거 기억 안남

//이거 infinite로 해야함
const getKey = (pageIndex: number, previousPageData: GetReviewListResponse | null, id: string) => {
  if (previousPageData && previousPageData.data.cursor.afterCursor === null) return null;

  let queryString = "";
  if (pageIndex === 0) {
    // 첫번째 페이지
    queryString = "";
  } else {
    // 두번째 페이지부터
    queryString = stringify({
      afterCursor: previousPageData?.data.cursor.afterCursor,
    });
  }

  return `http://localhost:8000/game/${id}?${queryString}/review`; //이거 맞는지 모르겠음
};

export function useDetailGameReview(id: string) {
  const { token } = useAuth();
  const response = useSWRInfinite<GetReviewListResponse>(
    (pageIndex, previousPageData) => getKey(pageIndex, previousPageData, id),
    (url) => fetcher(url, token)
  );
  console.log("Token is " + token);
  const isLast = response.data?.[response.data.length - 1]?.data.cursor?.afterCursor === null;
  const isEmpty = response.data?.[0]?.data.data.length === 0;
  return {
    ...response,
    isLast,
    isEmpty,
  };
}
//여기부터 post

export interface ReviewPostBody {
  content: string;
  rating: number;
}
export async function uploadReview(
  post: ReviewPostBody,
  id: string,
  token?: string
): Promise<ReviewResponse> {
  const { data } = await axios.post<ReviewPostBody, AxiosResponse<ReviewResponse>>(
    "http://localhost:8000/game/" + id + "/review",
    post,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    }
  );
  return data;
}

// export function usePostDetailGameReview(id?: string) {}
