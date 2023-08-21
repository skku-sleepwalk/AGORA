import { User } from "./user";

export interface Asset {
  id: string;
  title: string;
  description: string;
  downloadUrl: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  author: User;
  cost: {
    isFree: boolean;
    defaultPrice: number;
    isSale: boolean;
    salePercentage: number;
    saledPrice: number;
    saleStartAt: string;
    saleEndAt: string;
  };
  category: {
    id: string;
    name: string;
  };
  like: boolean;
  likeCount: number;
}

export interface AssetReview {
  id: string;
  content: string;
  rating: number;
  author: User;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  likeCount: number;
  dislikeCount: number;
  like: boolean;
  dislike: boolean;
}

export interface GetAssetListResponse {
  data: {
    data: Asset[];
    cursor: {
      afterCursor: string | null;
      beforeCursor: string | null;
    };
  };
}

export interface AssetSearchHistory {
  id: string;
  keyword: string;
  createdAt: string;
  deletedAt: string | null;
}

export interface GetAssetSearchHistoryResponse {
  data: AssetSearchHistory[];
}
