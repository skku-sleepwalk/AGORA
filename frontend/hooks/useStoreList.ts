import useSWRInfinite from "swr/infinite";
import { GetBoardListResponse } from "../types/api/boards";
import { stringify } from "querystring";
import { fetcher } from "../utils/fetcher";
import useAuth from "./useAuth";

export interface useStoreListSettings {
  search?: string;
  boardType?: "parent" | "child";
}

/////////////////////////

////////////////////////

////////////////////////
//getKey 함수란, 인덱스와 이전 페이지 데이터를 받고 페이지 키를 반환하는 함수이다.
const getKey = (
  pageIndex: number,
  previousPageData: GetBoardListResponse | null, //여기 고쳐야겠고.
  categories: string[],
  { search, boardType }: useStoreListSettings
) => {
  if (previousPageData && previousPageData.cursor.afterCursor === null) return null;
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
      afterCursor: previousPageData?.cursor.afterCursor,
      search,
    });
  }
  if (search) return `http://localhost:8000/developer-community-boards/search?${queryString}`;
  else return `http://localhost:8000/developer-community-boards/main?${queryString}`;
};
////////////////

//////////////////////

///////////////////////

////////////////

////////////////

function useBoardList(categories: string[], settings: useStoreListSettings = {}) {
  const { token } = useAuth();
  const response = useSWRInfinite<GetBoardListResponse>(
    (pageIndex, previousPageData) => getKey(pageIndex, previousPageData, categories, settings),
    (url) => fetcher(url, token)
  );
  const isLast = response.data?.[response.data.length - 1]?.cursor?.afterCursor === null;
  const isEmpty = response.data?.[0]?.data.length === 0;
  return {
    ...response,
    isLast,
    isEmpty,
  };
}

export default useBoardList;
