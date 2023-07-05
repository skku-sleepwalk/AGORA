import { User } from "../user";
import { Category } from "./category";

export interface Board {
  id: string;
  _id: number;
  title: string | null;
  content: string;
  like: number;
  child: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  writer: User;
  parent?: Board;
  categoryTypes: Category[];
}

export interface PostBoardBody {
  title?: string;
  content: string;
  writerEmail: string;
  parentId?: string;
  categoryNames: string[];
}

export type PostBoardResponse = Board;

export type GetBoardResponse = Board;

export interface GetBoardListResponse {
  data: Board[];
}
