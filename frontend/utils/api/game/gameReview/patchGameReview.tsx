import axios from "axios";
import { gameReviewData } from "./postGameReview";

export interface patchGameReviewResponse {
  gameId: string;
  data: gameReviewData;
  token?: string;
}

export async function patchGameReview({
  gameId,
  data,
  token,
}: patchGameReviewResponse): Promise<void | undefined> {
  const url = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/game/${gameId}/review`; // PATCH 요청을 보낼 엔드포인트 URL
  const headers = {
    "Content-Type": "application/json", // 요청의 콘텐츠 유형 지정
    Authorization: `${token}`,
  };

  try {
    const response = await axios.patch(url, data, { headers });
    // 서버로부터의 응답 처리
    return response.data;
  } catch (error) {
    // 오류 처리
    throw error;
  }
}
