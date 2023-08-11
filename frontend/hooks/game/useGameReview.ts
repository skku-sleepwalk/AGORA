import { GetGameReviewListResponse } from "../../types/api/game/gameReview";
import useSWRInfinite from "swr/infinite";
import { stringify } from "querystring";
import { fetcher } from "../../utils/fetcher";
import useAuth from "../useAuth";

//이거 infinite로 해야함
const getKey = (
  pageIndex: number,
  previousPageData: GetGameReviewListResponse | null,
  id: string,
  reviewId?: string
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
  if (reviewId === undefined) {
    if (queryString == "") {
      return `http://localhost:8000/game/${id}/review`;
    }
    return `http://localhost:8000/game/${id}/review?${queryString}`;
  } else {
    if (queryString == "") {
      return `http://localhost:8000/game/${id}/review/${reviewId}/comment`;
    }
    return `http://localhost:8000/game/${id}/review/${reviewId}/comment?${queryString}`;
  }
};

interface useGameReviewListProps {
  gameId: string;
  reviewId?: string;
}

export function useGameReviewList({ gameId, reviewId }: useGameReviewListProps) {
  const { token } = useAuth();
  const response = useSWRInfinite<GetGameReviewListResponse>(
    (pageIndex, previousPageData) => getKey(pageIndex, previousPageData, gameId, reviewId),
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
