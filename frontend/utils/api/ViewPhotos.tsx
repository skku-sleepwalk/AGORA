import axios, { AxiosResponse } from 'axios';
import { PostBoardBody } from "../../types/api/boards";

// content에서 img 태그의 src 속성값을 \를 제외하고 배열 형태로 반환하는 함수
function extractImageSrc(html: string): { src: string }[] {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  // 받아온 html 변수(string 형식)를 html 형식으로 변환

  const images = doc.getElementsByTagName("img");
  // doc의 img 태그와 일치하는 요소를 유사 배열 형태로 반환
  const srcArray: { src: string }[] = [];

  for (let i = 0; i < images.length; i++) {
    const src = images[i].getAttribute("src");
    // images의 i번 인덱스의 src 속성값을 반환
    if (src) {
      const unescapedSrc = decodeURI(src);
      // \를 제외함
      srcArray.push({ src: unescapedSrc });
    }
  }

  return srcArray;
}

let PhotoSrcValues: { src: string; }[] | undefined;

// 백엔드에서 정보를 받아와 이미지의 위치들을 내보내는 구문
axios.get<PostBoardBody>('http://localhost:8000/boards/main')
  .then((response: AxiosResponse<PostBoardBody>) => {
    const data: PostBoardBody = response.data;
    const content = data.content;
    const extractedImages = extractImageSrc(content)
    const PhotoSrcValues = extractedImages.map(image => ({ src: image.src }));
  })
  .catch((error: any) => {
    // 에러 처리
    console.error('Error:', error);
  });

export default PhotoSrcValues;



