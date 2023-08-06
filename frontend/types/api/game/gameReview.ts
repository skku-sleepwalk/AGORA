import { User } from "../user";

export interface GameReview {
  id: string;
  content: string;
  rating: number;
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
} //이거 맞는지 모르겠다

export interface MyGameReviewResponse {
  data: GameReview;
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

export interface GameReviewComment {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  author: User[];
  likeCount: number;
  dislikeCount: number;
  like: boolean;
  dislike: boolean;
}

export interface GetGameReviewCommentListResponse {
  data: {
    data: GameReviewComment[];
    cursor: {
      afterCursor: string | null;
      beforeCursor: string | null;
    };
  };
}
