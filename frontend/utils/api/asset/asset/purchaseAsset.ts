import axios from "axios";

export async function purchaseAsset(assetId: string, token: string) {
  await axios.post(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/asset/${assetId}/purchase`,
    {},
    {
      headers: {
        Authorization: `${token}`,
      },
    }
  );
}
