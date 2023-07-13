import axios from 'axios';
import { User } from '../../types/api/user';

// boardId와 userId를 받아 boards/like?에 patch하는 함수
export interface LikeClickResponse {
  boardId: string;
  userEmail: string;
}

export async function onLikeClick({ boardId, userEmail }: LikeClickResponse): Promise<void | undefined> {
  const url = `http://localhost:8000/boards/like?boardId=${boardId}`; // PATCH 요청을 보낼 엔드포인트 URL
  const data = {};
  const headers = {
    'Content-Type': 'application/json',  // 요청의 콘텐츠 유형 지정
    'Authorization': userEmail
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

// boards/likedUsers에 user-id가 들어있는 지 확인하고 boolean 값을 반환하는 함수
export function CheckIsliking({likedUsers, userEmail}: {likedUsers: User[], userEmail: string}): boolean {
  for (const entity of likedUsers) {
    if (entity.email === userEmail) {
      return true;
    }
  }
  return false;
}