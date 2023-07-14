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
          id: "fab03f34-4752-4a83-8fac-ebebb81c6952",
          name: "반야",
          description: "쉬고 싶은 레이디",
          email: "04smailing@naver.com",
          token: 0,
          rating: 0,
          createdAt: "2023-07-13T20:49:47.705Z",
          updatedAt: "2023-07-13T20:49:47.705Z",
          deletedAt: null
        },
        token: "04smailing@naver.com",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
