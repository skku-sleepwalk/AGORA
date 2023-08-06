import { User } from "../user";

export interface GameReview {
  id: string;
  content: string;
  rating?: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  author: User;
  likeCount: number;
  dislikeCount: number;
  like: boolean;
  dislike: boolean;
}

export interface GameReviewResponse {
  data: null;
}

export interface GetGameReviewListResponse {
  data: {
    data: GameReview[];
    cursor: {
      afterCursor: string | null;
      beforeCursor: string | null;
    };
  };
}

export interface MyGameReviewResponse {
  data: GameReview;
}
