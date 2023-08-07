import useSWRInfinite from "swr/infinite";
import { stringify } from "querystring";
import { fetcher } from "../utils/fetcher";
import useAuth from "./useAuth";
import { GetGameBoardListResponse } from "../types/api/game/gameBoard";

export interface useGameBoardListSettings {
  search?: string;
  parentId?: string;
  boardType?: "parent" | "child";
}

const getKey = (
  pageIndex: number,
  previousPageData: GetGameBoardListResponse | null,
  gameId: string,
  categories: string[],
  { search, parentId, boardType }: useGameBoardListSettings
) => {
  if (previousPageData && previousPageData.data.cursor.afterCursor === null) return null;
  let query: Record<string, any> = {
    categoryNames: categories.length > 0 ? categories.join(",") : null,
  };

  if (search) query.q = search;
  if (boardType) query.boardType = boardType;
  if (pageIndex > 0) query.afterCursor = previousPageData?.data.cursor.afterCursor;

  const queryString = stringify(query);

  if (search) return `http://localhost:8000/game/${gameId}/board/search?${queryString}`;
  if (parentId)
    return `http://localhost:8000/game/${gameId}/board/getChild/${parentId}?${queryString}`;
  else return `http://localhost:8000/game/${gameId}/board?${queryString}`;
};

function useGameBoardList(
  categories: string[],
  gameId: string,
  settings: useGameBoardListSettings = {}
) {
  const { token } = useAuth();
  const response = useSWRInfinite<GetGameBoardListResponse>(
    (pageIndex, previousPageData) =>
      getKey(pageIndex, previousPageData, gameId, categories, settings),
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

export default useGameBoardList;
