import useSWRInfinite from "swr/infinite";
import { GetBoardListResponse } from "../types/api/boards";
import { stringify } from "querystring";
import { fetcher } from "../utils/fetcher";
import useAuth from "./useAuth";

export interface useBoardListSettings {
  search?: string;
  parentId?: string;
  boardType?: "parent" | "child";
}

const getKey = (
  pageIndex: number,
  previousPageData: GetBoardListResponse | null,
  categories: string[],
  { search, parentId, boardType }: useBoardListSettings
) => {
  if (previousPageData && previousPageData.data.cursor.afterCursor === null) return null;
  let query: Record<string, any> = {
    categoryNames: categories.length > 0 ? categories.join(",") : null,
  };

  if (search) query.q = search;
  if (boardType) query.boardType = boardType;
  if (pageIndex > 0) query.afterCursor = previousPageData?.data.cursor.afterCursor;

  const queryString = stringify(query);

  if (search)
    return `${process.env.NEXT_PUBLIC_API_ENDPOINT}/community/board/search?${queryString}`;
  if (parentId)
    return `${process.env.NEXT_PUBLIC_API_ENDPOINT}/community/board/getChild/${parentId}?${queryString}`;
  else return `${process.env.NEXT_PUBLIC_API_ENDPOINT}/community/board?${queryString}`;
};

function useBoardList(categories: string[], settings: useBoardListSettings = {}) {
  const { token } = useAuth();
  const response = useSWRInfinite<GetBoardListResponse>(
    (pageIndex, previousPageData) => getKey(pageIndex, previousPageData, categories, settings),
    (url) => fetcher(url, token)
  );
  const isLast = response.data?.[response.data.length - 1]?.data.cursor?.afterCursor === null;
  const isEmpty = response.data?.[0]?.data.data.length === 0;
  return {
    ...response,
    isLast,
    isEmpty,
  };
}

export default useBoardList;
