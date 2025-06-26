import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";

import * as AuthSession from "expo-auth-session";

import { api, exchangeCodeForToken } from "../services/api";
import { CDN_IMAGE, CLIENT_ID, REDIRECT_URI, RESPONSE_TYPE, SCOPE } from "../configs";


type User = {
  id: string;
  username: string;
  firstName: string;
  avatar?: string;  // avatar pode ser opcional
  email: string;
  token: string;
};

type AuthContextData = {
  user: User | null;
  loading: boolean;
  signIn: () => Promise<void>;
};

type AuthProviderProps = {
  children: ReactNode;
};



export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
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

  useEffect(() => {
    async function handleAuthResponse() {
      if (response?.type === "success" && response.params.code) {
        setLoading(true);
        try {
          const tokenResponse = await exchangeCodeForToken(
            response.params.code,
            request?.codeVerifier || ""
          );

          api.defaults.headers.authorization = `Bearer ${tokenResponse.access_token}`;

          const userResponse = await api.get("/users/@me");
          const userData = userResponse.data;

          
          const loggedUser: User = {
            id: userData.id,
            username: userData.username,
            firstName: userData.username.split(" ")[0],
            avatar: `${CDN_IMAGE}/avatars/${userData.id}/${userData.avatar}.png`,
            email: userData.email,
            token: tokenResponse.access_token,
          };

          setUser(loggedUser);

          // // Salva usuário e token no AsyncStorage para persistência
          // await AsyncStorage.setItem("@app:user", JSON.stringify(loggedUser));
          // await AsyncStorage.setItem("@app:token", tokenResponse.access_token);
        } catch (error) {
          console.error("Erro ao autenticar:", error);
        } finally {
          setLoading(false);
        }
      } else if (response?.type && response.type !== "success") {
        console.warn("Login não concluído:", response.type);
      }
    }

    handleAuthResponse();
  }, [response]);

  async function signIn() {
    if (!request) return;

    setLoading(true);
    try {
      await promptAsync();
    } catch (error) {
      console.error("Erro no promptAsync:", error);
      setLoading(false);
    }
  }


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
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };
