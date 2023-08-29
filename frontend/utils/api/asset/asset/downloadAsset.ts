import axios from "axios";

export async function downloadAsset(assetId: string, token: string) {
  await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/asset/${assetId}/download`, {
    responseType: "blob",
    headers: {
      Authorization: `${token}`,
    },
  });
}
