import axios from "axios";
import { User } from "../../types/api/user";
import useAuth from "../../hooks/useAuth";
import { identity } from "@mantine/core/lib/Box/style-system-props/value-getters/get-default-value";

// boardId와 userId를 받아 boards/like?에 patch하는 함수
export interface LikeClickResponse {
  data: {
    boardId: string;
    token?: string;
  };
}

export async function onLikeClick(
  { data: { boardId, token } }: LikeClickResponse,
  currentLike: boolean
): Promise<void | undefined> {
  const url = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/community/board/${boardId}/like`; // PATCH 요청을 보낼 엔드포인트 URL
  const headers = {
    "Content-Type": "application/json", // 요청의 콘텐츠 유형 지정
    Authorization: `${token}`,
  };

  try {
    let response;
    if (currentLike) {
      response = await axios.delete(url, { headers });
    } else {
      response = await axios.post(url, {}, { headers });
    }
    return response.data;
  } catch (error) {
    // 오류 처리
    throw error;
  }
}
