import { gameInUser } from "./game/game";

export interface PlaytimesInUser {
  game: gameInUser;
  playtime: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  description: string;
  token: number;
  rating: number;
  totalPlaytime: number;
  playtime: number;
  playtimes: PlaytimesInUser[];
}

export interface GetUserResponse {
  data: User[];
}
export interface PostUserBody {
  name: string;
  email: string;
  description: string;
}

export type PostUserResponse = User;
