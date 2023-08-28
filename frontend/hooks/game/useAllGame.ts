import useSWRInfinite from "swr/infinite";
import { stringify } from "querystring";
import { fetcher } from "../../utils/fetcher";
import useAuth from "../useAuth";
import { GetGameListResponse } from "../../types/api/game/game";

export interface useGameListSettings {
  genreNames?: string[];
  search?: string;
}

//getKey 함수란, 인덱스와 이전 페이지 데이터를 받고 페이지 키를 반환하는 함수이다.
const getKey = (
  pageIndex: number,
  previousPageData: GetGameListResponse | null,
  { genreNames, search }: useGameListSettings
) => {
  if (previousPageData && previousPageData.data.cursor.afterCursor === null) return null;

  let queryString = "";
  let searchString = "";
  if (search != "" && search != undefined && search != null) {
    searchString = search;
  }
  if (pageIndex === 0) {
    // 첫번째 페이지
    console.log("장르", genreNames);
    console.log("서치", searchString);

    queryString = stringify({
      genreNames: genreNames,
      q: searchString,
    });
  } else {
    // 두번째 페이지부터
    queryString = stringify({
      afterCursor: previousPageData?.data.cursor.afterCursor,

      genreNames: genreNames,
      q: searchString,
    });
  }

  return `${process.env.NEXT_PUBLIC_API_ENDPOINT}/game/search?${queryString}`; //이거 맞는지 모르겠음
};

function useAllGame(settings: useGameListSettings = {}) {
  const { token } = useAuth();
  const response = useSWRInfinite<GetGameListResponse>(
    (pageIndex, previousPageData) => getKey(pageIndex, previousPageData, settings),
    (url) => fetcher(url, token)
  );
  console.log(token);
  const isLast = response.data?.[response.data.length - 1]?.data.cursor?.afterCursor === null;
  const isEmpty = response.data?.[0]?.data.data.length === 0;
  return {
    ...response,
    isLast,
    isEmpty,
  };
}

export default useAllGame;
