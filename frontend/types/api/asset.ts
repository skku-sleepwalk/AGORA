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
  popularTags: AssetTag[];
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

export interface GetAssetReviewListResponse {
  data: {
    data: AssetReview[];
    cursor: {
      afterCursor: string | null;
      beforeCursor: string | null;
    };
  };
}

export interface GetAssetResponse {
  data: Asset;
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

export interface PostAssetSearch {
  keyword: string;
}

export interface AssetReviewResponse {
  data: null;
}

export interface AssetLikeResponse {
  data: null;
}

export interface MyAssetReviewResponse {
  data: AssetReview;
}

export interface AssetTag {
  id: string;
  name: string;
}

export interface AssetTagResponse {
  data: AssetTag[];
}

export interface MyAssetTag {
  id: string;
  tag: AssetTag;
}

export interface MyAssetTagResponse {
  data: MyAssetTag[];
}

export interface AssetTagName {
  tagName: string;
}

export interface PostAssetTagResponse {
  data: null;
}
