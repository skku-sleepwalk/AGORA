import { User } from "../../../types/api/user";
import { ReactNode, createContext, useState } from "react";

interface AuthContextType {
  user?: User;
  token?: string;
}

export const AuthContext = createContext<AuthContextType>({});

export interface AuthProviderProps {
  children: ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  return (
    <AuthContext.Provider
      value={{
        user: {
          id: "d073aac2-0b31-405a-adce-1dcdf9aaa78f",
          name: "루카스",
          description: "루카스스님 한판해요",
          email: "lucas@naver.com",
          token: 0,
          rating: 0,
          createdAt: "2023-07-13T02:13:31.014Z",
          updatedAt: "2023-07-13T02:13:31.014Z",
          deletedAt: null,
        },
        token: "lucas@naver.com",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
