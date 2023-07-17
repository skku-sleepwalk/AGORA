import axios, { AxiosResponse } from "axios";

export default async function deletePost(postId: string): Promise<void> {
  try {
    const response: AxiosResponse = await axios.delete(
      `http://localhost:8000/developer-community-boards/${postId}`
    );
    console.log(response.data); // 삭제된 포스트의 응답 데이터 처리

    // 성공적으로 삭제되었을 때 추가로 작업을 수행할 수 있습니다.
    // 예: 상태 업데이트, 다른 요청 등
  } catch (error) {
    console.error("post ID is");
    console.error(postId);

    console.error(error); // 오류 처리
  }
}
