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
  let queryString = "";
  if (pageIndex === 0) {
    // 첫번째 페이지
    queryString = stringify({
      categoryNames: categories.length > 0 ? categories.join(",") : undefined,
      order: "createdAt",
      boardType,
      search,
    });
  } else {
    // 두번째 페이지부터
    queryString = stringify({
      categoryNames: categories.length > 0 ? categories.join(",") : undefined,
      order: "createdAt",
      boardType,
      afterCursor: previousPageData?.data.cursor.afterCursor,
      search,
    });
  }
  if (search) return `http://localhost:8000/community/board/search?${queryString}`;
  if (parentId) return `http://localhost:8000/community/board/getChild/${parentId}?${queryString}`;
  else return `http://localhost:8000/community/board?${queryString}`;
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
