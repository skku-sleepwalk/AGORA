import useSWRInfinite from "swr/infinite";
import { stringify } from "querystring";
import { fetcher } from "../../utils/fetcher";
import useAuth from "../useAuth";
import { GetGameBoardListResponse } from "../../types/api/game/gameBoard";

const getKey = (
  pageIndex: number,
  previousPageData: GetGameBoardListResponse | null,
  userId: string
) => {
  if (previousPageData && previousPageData.data.cursor.afterCursor === null) return null;

  let queryString = "";
  if (pageIndex !== 0) {
    // 두번째 페이지부터
    queryString = stringify({
      afterCursor: previousPageData?.data.cursor.afterCursor,
    });
  }
  //    else return `NEXT_PUBLIC_API_URL/users/${userId}/profile/written-game-board${queryString}`;
  else return `http://localhost:8000/users/${userId}/profile/written-game-board${queryString}`; //작동X해야함
};

function useMyGameBoardList() {
  const { user, token } = useAuth();
  const response = useSWRInfinite<GetGameBoardListResponse>(
    (pageIndex, previousPageData) => getKey(pageIndex, previousPageData, user?.id),
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

export default useMyGameBoardList;
