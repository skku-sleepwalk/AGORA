import { User } from "./user";
import { Category } from "./category";

export interface Board {
  id: string;
  _id: number;
  title: string | null;
  content: string;
  like: boolean;
  likeCount: number;
  childCount: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  author: User;
  parent?: Board;
  categories: Category[];
}

export interface PostBoardBody {
  title?: string;
  content: string;
  parentId?: string;
  categoryNames: string[];
}

export interface GetBoardResponse {
  data: Board;
}

export interface GetBoardListResponse {
  data: {
    data: Board[];
    cursor: {
      afterCursor: string | null;
      beforeCursor: string | null;
    };
  };
}
