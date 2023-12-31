import axios from "axios";
import { LoginResponse, PostUserBody } from "../../types/api/user";
import { showError } from "../notifications";

export async function login(email: string, password: string) {
  try {
    const response = await axios.post<LoginResponse>(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/users/login`,
      {
        email,
        password,
      }
    );
    return response.data;
  } catch (error) {
    showError("로그인에 실패했습니다.", "이메일과 비밀번호를 확인해주세요.");
    return null;
  }
}

export async function register({ email, password, name, description }: PostUserBody) {
  const response = await axios.post<PostUserBody>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/users`, {
    email,
    password,
    name,
    description,
  });
  return response.data;
}
