import { User } from "./user";

export interface StoreData {
  id: string;
  title: string;
  distributor: string;
  developer: string;
  snsUrls: SNSUrls | undefined;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  cost: Cost | undefined;
}
export interface Information {
  id: string;
  description: string;
  specification: string;
}
export interface GameStore {
  data: {
    id: string;
    title: string;
    downloadUrl: string;
    executablePath: string;
    shortImgUrl: string;
    shortContent: string;
    likeCount: number;
    like: boolean;
    rating: number;
    // description: string;
    // distributor: string;
    // developer: string;
    createdAt: string;
    updatedAt: Date;
    deletedAt: Date;
    information: Information;
    price: number;
    author: User;
    likedUsers: Array<User> | undefined;
    store: StoreData;
    genres: Array<GameStoreGenre> | undefined;
  };
  //data로 한번 감싸야함
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
  data: {
    data: GameStore[];
    cursor: {
      afterCursor: string | null;
      beforeCursor: string | null;
    };
  };
}
//여기부터 review

export interface Review {
  id: string;
  content: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  author: {
    id: string;
    name: string;
    email: string;
    description: string;
    token: number;
    rating: number;
    totalPlaytime: number;
    playtime: number;
  };
  likeCount: number;
  dislikeCount: number;
  like: boolean;
  dislike: boolean;
}
export interface ReviewResponse {
  data: Review;
} //이거 맞는지 모르겠다
export interface GetReviewListResponse {
  data: {
    data: Review[];
    cursor: {
      afterCursor: string | null;
      beforeCursor: string | null;
    };
  };
}
