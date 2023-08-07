import useSWRInfinite from "swr/infinite";
import { stringify } from "querystring";
import { fetcher } from "../utils/fetcher";
import useAuth from "./useAuth";
import { GetGameStoreListResponse } from "../types/api/game/gameStore";
export interface useGameStoreListSettings {
  name?: string;
}

//getKey 함수란, 인덱스와 이전 페이지 데이터를 받고 페이지 키를 반환하는 함수이다.
const getKey = (
  pageIndex: number,
  previousPageData: GetGameStoreListResponse | null,
  { name }: useGameStoreListSettings
) => {
  if (previousPageData && previousPageData.data.cursor.afterCursor === null) return null;

  let queryString = "";
  if (pageIndex === 0) {
    // 첫번째 페이지
    queryString = stringify({
      genreName: name,
    });
  } else {
    // 두번째 페이지부터
    queryString = stringify({
      afterCursor: previousPageData?.data.cursor.afterCursor,
      genreName: name,
    });
  }

  if (name) return `http://localhost:8000/game?${queryString}`; //이거 맞는지 모르겠음
  else return `http://localhost:8000/community/board?${queryString}`; //작동X해야함
};

function useGameStoreList(settings: useGameStoreListSettings = {}) {
  const { token } = useAuth();
  const response = useSWRInfinite<GetGameStoreListResponse>(
    (pageIndex, previousPageData) => getKey(pageIndex, previousPageData, settings),
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

export default useGameStoreList;
