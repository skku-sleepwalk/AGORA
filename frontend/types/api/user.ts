import { Board } from "./boards";

export interface User {
  id: string;
  name: string;
  description: string | null;
  email: string;
  token: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface PostUserBody {
  name: string;
  email: string;
  description?: string;
}

export type PostUserResponse = User;
