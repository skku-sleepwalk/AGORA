import useSWRInfinite from "swr/infinite";
import { stringify } from "querystring";
import useAuth from "./useAuth";
import { GetAssetReviewListResponse } from "../types/api/asset";
import { fetcher } from "../utils/fetcher";

const getKey = (
  pageIndex: number,
  previousPageData: GetAssetReviewListResponse | null,
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
      return `${process.env.NEXT_PUBLIC_API_ENDPOINT}/asset/${id}/review`;
    }
    return `${process.env.NEXT_PUBLIC_API_ENDPOINT}/asset/${id}/review?${queryString}`;
  } else {
    if (queryString == "") {
      return `${process.env.NEXT_PUBLIC_API_ENDPOINT}/asset/${id}/review/${reviewId}/comment`;
    }
    return `${process.env.NEXT_PUBLIC_API_ENDPOINT}/asset/${id}/review/${reviewId}/comment?${queryString}`;
  }
};

interface useGameReviewListProps {
  assetId: string;
  reviewId?: string;
}

export function useAssetReviewList({ assetId, reviewId }: useGameReviewListProps) {
  const { token } = useAuth();
  const response = useSWRInfinite<GetAssetReviewListResponse>(
    (pageIndex, previousPageData) => getKey(pageIndex, previousPageData, assetId, reviewId),
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
