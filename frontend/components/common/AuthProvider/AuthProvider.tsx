import { User } from "../../../types/api/user";
import { ReactNode, createContext, useState } from "react";
import useSWR from "swr";

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
  const { data } = useSWR<User[]>("http://localhost:8000/users");

  return (
    <AuthContext.Provider
      value={{
        user: data?.[0],
        token: data?.[0]?.email,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
