import {
  GetGameReviewListResponse,
  GameReviewResponse,
  GetGameReviewCommentListResponse,
} from "../types/api/game/gameReview";
import useSWRInfinite from "swr/infinite";
import { stringify } from "querystring";
import { fetcher } from "../utils/fetcher";
import useAuth from "./useAuth";
import axios, { AxiosResponse } from "axios";
//사실 지금 이거 기억 안남

//이거 infinite로 해야함
const getKey = (
  pageIndex: number,
  previousPageData: GetGameReviewListResponse | null,
  id: string
) => {
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
  if (queryString == "") {
    return `http://localhost:8000/game/${id}/review`;
  }
  console.log(`http://localhost:8000/game/${id}?${queryString}/review`);
  return `http://localhost:8000/game/${id}/review?${queryString}`; //이거 맞는지 모르겠음
};

export function useDetailGameReview(id: string) {
  const { token } = useAuth();
  const response = useSWRInfinite<GetGameReviewListResponse>(
    (pageIndex, previousPageData) => getKey(pageIndex, previousPageData, id),
    (url) => fetcher(url, token)
  );
  const isLast = response.data?.[response.data.length - 1]?.data.cursor?.afterCursor === null;
  const isEmpty = response.data?.[0]?.data?.data?.length === 0;
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
export interface Likes {}
export interface ReviewCommentBody {
  content: string;
}
export async function uploadReview(
  post: ReviewPostBody,
  id: string,
  token?: string
): Promise<GameReviewResponse> {
  const { data } = await axios.post<ReviewPostBody, AxiosResponse<GameReviewResponse>>(
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

export async function uploadReviewComment(
  post: ReviewCommentBody,
  id: string,
  commentId: string,
  token?: string
): Promise<GameReviewResponse> {
  const { data } = await axios.post<ReviewPostBody, AxiosResponse<GameReviewResponse>>(
    "http://localhost:8000/game/" + id + "/review/" + commentId + "/comment",
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

///////////////////////

const getKey2 = (
  pageIndex: number,
  previousPageData: GetGameReviewCommentListResponse | null,
  id: string,
  reviewId: string
) => {
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
  if (queryString == "") {
    return `http://localhost:8000/game/${id}/review/${reviewId}/comment`;
  }
  return `http://localhost:8000/game/${id}/review/${reviewId}/comment?${queryString}`; //이거 맞는지 모르겠음
};

export function useReviewComment(id: string, reviewId: string) {
  const { token } = useAuth();
  const response = useSWRInfinite<GetGameReviewCommentListResponse>(
    (pageIndex, previousPageData) => getKey2(pageIndex, previousPageData, id, reviewId),
    (url) => fetcher(url, token)
  );
  const isLast = response.data?.[response.data.length - 1]?.data.cursor?.afterCursor === null;
  const isEmpty = response.data?.[0]?.data?.data?.length === 0;
  return {
    ...response,
    isLast,
    isEmpty,
  };
}
/////
//like 관련
export async function ReviewLike(
  id: string,
  reviewId: string,
  token?: string
): Promise<GameReviewResponse> {
  const { data } = await axios.post<Likes, AxiosResponse<GameReviewResponse>>(
    "http://localhost:8000/game/" + id + "/review/" + reviewId + "/like",
    {},
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    }
  );
  return data;
}
export async function ReviewLikeDel(
  id: string,
  reviewId: string,
  token?: string
): Promise<GameReviewResponse> {
  const { data } = await axios.delete<Likes, AxiosResponse<GameReviewResponse>>(
    "http://localhost:8000/game/" + id + "/review/" + reviewId + "/like",

    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    }
  );
  return data;
}

export async function ReviewDislike(
  id: string,
  reviewId: string,
  token?: string
): Promise<GameReviewResponse> {
  const { data } = await axios.post<Likes, AxiosResponse<GameReviewResponse>>(
    "http://localhost:8000/game/" + id + "/review/" + reviewId + "/dislike",
    {},
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    }
  );
  return data;
}
export async function ReviewDislikeDel(
  id: string,
  reviewId: string,
  token?: string
): Promise<GameReviewResponse> {
  const { data } = await axios.delete<Likes, AxiosResponse<GameReviewResponse>>(
    "http://localhost:8000/game/" + id + "/review/" + reviewId + "/dislike",

    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    }
  );
  return data;
}
