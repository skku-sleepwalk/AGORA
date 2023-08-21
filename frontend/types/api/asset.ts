import { User } from "./user";

export interface Asset {
  id: string;
  cost: {
    isFree: boolean;
    defaultPrice: number;
    isSale: boolean;
    salePercentage: number;
    saledPrice: number;
    saleStartAt: string;
    saleEndAt: string;
  };
  title: string;
  description: string;
  author: string;
  downloadUrl: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  likeCount: number;
  like: boolean;
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
