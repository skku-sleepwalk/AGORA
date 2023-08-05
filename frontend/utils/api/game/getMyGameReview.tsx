import useSWR from "swr";
import axios from "axios";
import { GameReview } from "../../../types/api/game/gameReview";

const fetchData = async (url: string): Promise<GameReview> => {
  const response = await axios.get(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "04smailing@naver.com",
    },
  });
  return response.data;
};

export interface GetMyGameReviewProps {
  gameId: string;
  userEmail: string;
}

export function GetMyGameReview({ gameId, userEmail }: GetMyGameReviewProps) {
  const url = `http://localhost:8000/game/${gameId}/review/user`;

  const { data, error } = useSWR<GameReview>(url, fetchData);
  if (error) {
    console.log("에러");
  } else {
    console.log(data);
  }

  return data;
}
