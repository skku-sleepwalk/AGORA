import axios from "axios";

export async function downloadAsset(assetId: string, token: string) {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/asset/${assetId}/download`,
    {
      responseType: "blob",
      headers: {
        Authorization: `${token}`,
      },
    }
  );

  // Content-Disposition 헤더에서 파일 이름 추출
  const contentDisposition = response.headers["content-disposition"];
  let fileName = "unknown";
  if (contentDisposition) {
    const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
    if (fileNameMatch && fileNameMatch.length > 1) {
      fileName = fileNameMatch[1];

      // URI 인코딩된 파일 이름을 디코딩
      fileName = decodeURIComponent(fileName);
    }
  }

  // Blob 데이터로 파일 다운로드
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
  link.parentNode?.removeChild(link);
}
