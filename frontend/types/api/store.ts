import { User } from "./user";

export interface GameStore {
  id: string;
  title: string;
  description: string;
  distributor: string;
  developer: string;
  likeCount: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  price: number;
  // author: User;
  likedUsers: Array<User> | undefined;
  genres: Array<GameStoreGenre> | undefined;
  shortDescription: ShortDescription | undefined;
  snsUrls: SNSUrls | undefined;
  cost: Cost | undefined;
}
export interface ShortDescription {
  id: string;
  imageUrl: string;
  content: string;
}
export interface GameStoreGenre {
  id: string;
  name: string;
}

export interface Cost {
  id: string;
  isFree: boolean;
  defaultPrice: number;
  isSale: boolean;
  salePercentage: number;
  saledPrice: number;
  saleStart: Date;
  saleEnd: Date;
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

export interface PlayTimeRelation {
  id: string;
  playTime: number;
  gameStore: GameStore;
}

export interface GetStoreListResponse {
  data: GameStore[];
  cursor: {
    afterCursor: string | null;
    beforeCursor: string | null;
  };
}
