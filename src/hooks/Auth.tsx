import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";

import * as AuthSession from "expo-auth-session";

import { api, exchangeCodeForToken } from "../services/api";
import { CLIENT_ID, REDIRECT_URI, RESPONSE_TYPE, SCOPE } from "../configs";

type User = {
  id: string;
  username: string;
  firstName: string;
  avatar: string;
  email: string;
  token: string;
};

type AuthContextData = {
  user: User;
  loading: boolean;
  signIn: () => Promise<void>;
};

type AuthProviderProps = {
  children: ReactNode;
};

type AuthorizationResponse = AuthSession.AuthSessionResult & {
  params: {
    code?: string;
    error?: string;
  };
};

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User);
  const [loading, setLoading] = useState(false);

  const discovery = {
    authorizationEndpoint: "https://discord.com/oauth2/authorize",
    tokenEndpoint: "https://discord.com/api/oauth2/token",
  };

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: CLIENT_ID,
      scopes: SCOPE.split("+"),
      redirectUri: REDIRECT_URI,
      responseType: RESPONSE_TYPE,
    },
    discovery
  );

  async function signIn() {
    try {
      setLoading(true);

      if (request) {
        await promptAsync();
        setTimeout(() => {

          if (response?.type == "success" && response.params.code) {
            exchangeCodeForToken(
              response.params.code,
              request.codeVerifier!
            ).then((resposta) => {
              api.defaults.headers.authorization = `Bearer ${resposta.access_token}`;
              api
                .get("/users/@me")
                .then((r) => {
                })
                .catch((error) => console.log("\n\n\n ERRO:", error));
            });
          }
        }, 500);
      }

      // setUser(userData);
    } catch {
      throw new Error("Não foi possivel auntenticar.");
    } finally {
      setLoading(false);
    }
  }

  async function loadUserStorageData() {
    // const storage = await AsyncStorage.getItem(COLLECTION_USERS);
    // if (storage) {
    //   const userLogged = JSON.parse(storage) as User;
    //   api.defaults.headers.authorization = `Bearer ${userLogged.token}`;
    //   setUser(userLogged);
    // }
  }

  useEffect(() => {
    loadUserStorageData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
