import { User } from "../user";
import { Game } from "./game";

export interface GameBoardCategory {
  id: string;
  name: string;
}

export interface GameBoard {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  author: User;
  parent?: string;
  categories: GameBoardCategory[];
  childCount: number;
  likeCount: number;
  like: string[];
  game: Game;
}

export interface PostGameBoardBody {
  title: string;
  content: string;
  categoryNames: string[];
  parentId?: string;
}

export interface PatchGameBoardBody {
  title: string;
  content: string;
  categoryNames: string[];
}

export interface GetGameBoardListResponse {
  data: {
    data: GameBoard[];
    cursor: {
      beforeCursor: "string";
      afterCursor: "string";
    };
  };
}

export interface GetGameBoardResponse {
  data: GameBoard;
}
