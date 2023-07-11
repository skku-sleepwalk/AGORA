import { PostViewerProps } from "../../components/pages/community/PostViewer/PostViewer";

// content에서 img 태그의 src 속성값을 \를 제외하고 배열 형태로 반환하는 함수
export function extractImageSrc(html: string) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  // 받아온 html 변수(string 형식)를 html 형식으로 변환

  const images = doc.getElementsByTagName("img");
  // doc의 img 태그와 일치하는 요소를 유사 배열 형태로 반환
  const srcArray = [];
  if (images.length == 0) {
    return "none";
  }

  for (let i = 0; i < images.length; i++) {
    const src = images[i].getAttribute("src");
    // images의 i번 인덱스의 src 속성값을 반환
    if (src) {
      const unescapedSrc = decodeURI(src);
      // \를 제외함
      srcArray.push(unescapedSrc);
    }
  }

  return srcArray;
}

// thumbnailUrl를 추출하는 함수
export function extractThumbnailUrl ({ post }: PostViewerProps) {
  extractImageSrc(post.content)
}

// 아래는 PhotoViewer에서 사용 가능한 형식으로 바꾸는 코드
// const extractedImages = extractImageSrc(content)
// const PhotoSrcValues = extractedImages.map(image => ({ src: image.src }));