import useSWRInfinite from "swr/infinite";
import useAuth from "./useAuth";
import { fetcher } from "../utils/fetcher";
import { GetAssetListResponse } from "../types/api/asset";
import { stringify } from "querystring";

export interface useAssetListSettings {
  search?: string;
}

const getKey = (
  pageIndex: number,
  previousPageData: GetAssetListResponse | null,
  category: string | string[],
  { search }: useAssetListSettings
) => {
  if (previousPageData && previousPageData.data.cursor.afterCursor === null) return null;
  // 만약 이전 데이터가 존재 && afterCursor가 없는 경우 null 반환
  let query: Record<string, any> = {
    categoryNames:
      category.length > 0 && typeof category !== "string" ? category.join(",") : category,
    // join 함수: 배열 요소를 문자열로 합치며, 구분자를 지정할 수 있음
  };

  if (search) query.q = search;
  // query의 q라는 키의 값으로 search를 넣음
  if (pageIndex > 0) query.afterCursor = previousPageData?.data.cursor.afterCursor;
  // 만약 인덱스가 0보다 크다면 query의 afterCursor키의 값에 이전 데이터의 afterCursor을 넣음.

  const queryString = stringify(query);

  if (search) return `${process.env.NEXT_PUBLIC_API_ENDPOINT}/asset/search?${queryString}`;
  else return `${process.env.NEXT_PUBLIC_API_ENDPOINT}/asset?${queryString}`;
};

function useAssetList(category: string | string[], settings: useAssetListSettings = {}) {
  const { token } = useAuth();
  const response = useSWRInfinite<GetAssetListResponse>(
    (pageIndex, previousPageData) => getKey(pageIndex, previousPageData, category, settings),
    (url) => fetcher(url, token),
    { initialSize: 2 }
  );
  const isLast = response.data?.[response.data.length - 1]?.data.cursor?.afterCursor === null;
  const isEmpty = response.data?.[0]?.data.data.length === 0;
  return {
    ...response,
    isLast,
    isEmpty,
  };
}

export default useAssetList;
