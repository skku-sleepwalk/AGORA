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

export interface PlaytimesInUser {
  game: gameInUser;
  playtime: number;
}

export interface gameInUser {
  id: string;
  title: string;
  downloadUrl: string;
  executablePath: string;
  shortImgUrl: string;
  shortContent: string;
  iconUrl: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export interface GetUserResponse {
  data: User[];
}

export interface GetMeResponse {
  data: User;
}

export interface PostUserBody {
  name: string;
  email: string;
  description: string;
  password: string;
}

export interface PostUserResponse {
  data: User;
}

export interface LoginResponse {
  data: User;
}
