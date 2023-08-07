import { User } from "../user";

export interface GameBoard {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  author: User;
  parent?: string;
  categories: string[];
  childCount: number;
  likeCount: number;
  like: string[];
}

export interface PostGameBoardBody {
  title: string;
  content: string;
  categoryNames: string[];
  parentId?: string;
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
