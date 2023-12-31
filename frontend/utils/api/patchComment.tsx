import axios from "axios";

// boardId와 data, userId를 받아 boards/update?에 patch하는 함수
export interface patchComment {
  title: undefined;
  content: string;
  categoryNames: string[];
}

export interface PatchCommentResponse {
  boardId: string;
  data: patchComment;
  token?: string;
}

export async function patchComment({
  boardId,
  data,
  token,
}: PatchCommentResponse): Promise<void | undefined> {
  const url = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/community/board/${boardId}`; // PATCH 요청을 보낼 엔드포인트 URL
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
