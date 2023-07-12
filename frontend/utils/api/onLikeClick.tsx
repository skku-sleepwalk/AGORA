import axios from 'axios';
import { User } from '../../types/api/user';

// boardId와 userId를 받아 boards/like?에 patch하는 함수
export interface LikeClickResponse {
  boardId: string;
  userId: string;
}

// export async function onLikeClick({ boardId, userId }: LikeClickResponse): Promise<void | undefined> {
//   const url = `http://localhost:8000/boards/like?boardId=${boardId}&userId=${userId}`;
//   const data = {};
//   const headers = {
//     'Content-Type': 'application/json',
//   };

//   try {
//     await axios.patch(url, data, { headers }); // 서버로 데이터 업데이트 요청
//     mutate(url, undefined, true); // 강제로 데이터를 다시 가져오고 캐시를 갱신
//   } catch (error) {
//     throw error; // 오류 처리
//   }
// }

export async function onLikeClick({ boardId, userId }: LikeClickResponse): Promise<void | undefined> {
  const url = `http://localhost:8000/boards/like?boardId=${boardId}&userId=${userId}`; // PATCH 요청을 보낼 엔드포인트 URL
  const data = {};
  const headers = {
    'Content-Type': 'application/json'  // 요청의 콘텐츠 유형 지정
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
export function CheckIsliking({likedUsers, userId}: {likedUsers: User[], userId: string}): boolean {
  for (const entity of likedUsers) {
    if (entity.id === userId) {
      return true;
    }
  }
  return false;
}