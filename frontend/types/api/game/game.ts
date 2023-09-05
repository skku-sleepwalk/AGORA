import { User } from "../user";
import { GameTag } from "./gameTag";

export interface Game {
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
  likeCount: number;
  like: boolean;
  isPlayable: boolean;
  playtime: number;
  remaintime: number;
  store: GameStore;
  author: User;
  rating: number;
  information: Information;
  genres: GameGenre[];
  popularTags: GameTag[];
}

// 게임 스토어
export interface GameStore {
  id: string;
  title: string;
  imgUrls: string[];
  distributor: string;
  developer: string;
  snsUrls: SNSUrls | undefined;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  cost: Cost | undefined;
  likeCount: number;
  like: boolean;
}

export interface Cost {
  id: string;
  isFree: boolean;
  defaultPrice: number;
  isSale: boolean;
  salePercentage: number;
  saledPrice: number;
  saleStartAt: Date;
  saleEndAt: Date;
}

export interface SNSUrls {
  id: string;
  youtube: string;
  twitch: string;
  twitter: string;
  discord: string;
  facebook: string;
  instagram: string;
  customPage: string;
}

export interface Information {
  id: string;
  description: string;
  specification: string;
}

export interface GameGenre {
  id: string;
  name: string;
}

export interface GetGameListResponse {
  data: {
    data: Game[];
    cursor: {
      afterCursor: string | null;
      beforeCursor: string | null;
    };
  };
}

export interface GetGameResponse {
  data: Game;
}

export interface GameLikeResponse {
  data: null;
}
