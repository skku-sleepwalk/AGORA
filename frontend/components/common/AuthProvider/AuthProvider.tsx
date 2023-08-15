import { GetMeResponse, GetUserResponse, LoginResponse, User } from "../../../types/api/user";
import { ReactNode, createContext, useEffect, useState } from "react";
import { login } from "../../../utils/api/users";
import Cookies from "cookies-ts";
import useSWR from "swr";
import { fetcher } from "../../../utils/fetcher";
import { showNotification } from "../../../utils/notifications";
import SignUpForm from "../SignUpForm/SignUpForm";
import { Modal, ScrollArea } from "@mantine/core";
import SignInForm from "../SignInForm/SignInForm";
import { resetModalStyles } from "../../../styles/resetStyle";

interface AuthContextType {
  user: User | null;
  token?: string;
  login: (email: string, password: string) => Promise<LoginResponse | null>;
  logout: () => void;
  openSignInModal: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => null,
  logout: () => {},
  openSignInModal: () => {},
});

export interface AuthProviderProps {
  children: ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
  const cookie = new Cookies();
  const [token, setToken] = useState<string | undefined>(undefined);
  const { data: userData, mutate: mutateUser } = useSWR<GetMeResponse>(
    token ? `http://localhost:8000/users/me` : null,
    (url) => fetcher(url, token || undefined)
  );
  const [user, setUser] = useState<User | null>(userData?.data || null);
  const [signInModalOpened, setSignInModalOpened] = useState(false);
  const [signUpModalOpened, setSignUpModalOpened] = useState(false);

  useEffect(() => {
    if (userData) {
      setUser(userData.data);
    } else {
      setUser(null);
    }
  }, [userData]);

  useEffect(() => {
    const token = cookie.get("token");
    if (token) {
      setToken(token);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login: async (email: string, password: string) => {
          const response = await login(email, password).then((response) => {
            if (response) {
              cookie.set("token", response.data.email, {
                expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
              });
              setToken(response.data.email);
              mutateUser();
              showNotification("로그인 완료!", "로그인이 완료되었습니다.");
            }
            return response;
          });
          return response;
        },
        logout: () => {
          setUser(null);
          cookie.remove("token");
          setToken(undefined);
          mutateUser();
        },
        openSignInModal: () => {
          setSignInModalOpened(true);
        },
      }}
    >
      {children}
      <Modal
        opened={signInModalOpened}
        withCloseButton={false}
        sx={resetModalStyles}
        centered
        size="auto"
        scrollAreaComponent={ScrollArea.Autosize}
        onClose={() => setSignInModalOpened(false)}
      >
        <SignInForm
          onSignUpClick={() => {
            setSignUpModalOpened(true);
            setSignInModalOpened(false);
          }}
          onCompleted={() => {
            setSignInModalOpened(false);
          }}
        />
      </Modal>
      <Modal
        opened={signUpModalOpened}
        withCloseButton={false}
        sx={resetModalStyles}
        centered
        size="auto"
        scrollAreaComponent={ScrollArea.Autosize}
        onClose={() => {
          setSignInModalOpened(true);
          setSignUpModalOpened(false);
        }}
      >
        <SignUpForm
          onCompleted={() => {
            setSignUpModalOpened(false);
          }}
        />
      </Modal>
    </AuthContext.Provider>
  );
}

export default AuthProvider;
