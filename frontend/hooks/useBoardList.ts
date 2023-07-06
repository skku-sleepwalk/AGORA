import useSWRInfinite from "swr/infinite";
import { GetBoardListResponse } from "../types/api/boards";
import { stringify } from "querystring";
import { fetcher } from "../utils/fetcher";

const getKey = (
  pageIndex: number,
  previousPageData: GetBoardListResponse,
  categories: string[],
  search?: string
) => {
  if (previousPageData.data.length === 0) return null; // 마지막 페이지
  if (pageIndex === 0) {
    // 첫번째 페이지
    const queryString = stringify({
      categoryNames: categories.length > 0 ? categories.join(",") : undefined,
      order: "_id",
      search,
    });
    return `/boards/search?${queryString}`;
  } else {
    // 두번째 페이지부터
    const queryString = stringify({
      categoryNames: categories.length > 0 ? categories.join(",") : undefined,
      order: "_id",
      afterCursor: previousPageData.cursor.afterCursor,
      search,
    });
    return `/boards/search?${queryString}`;
  }
};

function useBoardList(categories: string[], search?: string) {
  const response = useSWRInfinite<GetBoardListResponse>(
    (pageIndex, previousPageData) => getKey(pageIndex, previousPageData, categories, search),
    fetcher
  );
  return response;
}

export default useBoardList;
