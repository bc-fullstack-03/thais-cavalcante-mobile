import React, { ReactNode, useReducer } from "react";
import jwtDecode from "jwt-decode";
import * as SecureStore from "expo-secure-store";
import { authenticate, registerUser } from "../services/auth";
import { Alert } from "react-native";
import { navigate } from "../RootNavigation";

interface AuthContext {
  token: string;
  user: string;
  profile: string;
  errorMessage: string;
  isLoading: boolean;
  login?: () => void;
  tryLocalLogin?: () => void;
  register?: () => void;
  logout?: () => void;
}

const defaultValue: AuthContext = {
  token: "",
  user: "",
  profile: "",
  errorMessage: "",
  isLoading: true,
};

const Context = React.createContext<AuthContext>(defaultValue);
const Provider = ({ children }: { children: ReactNode }) => {
  const reducer = (state: AuthContext, action) => {
    switch (action.type) {
      case "login":
        return {
          ...state,
          ...action.payload,
          errorMessage: "",
        };
      case "add_error":
        return {
          ...state,
          errorMessage: action.payload,
        };
      case "user_created":
        return {
          ...state,
          ...action.payload,
          errorMessage: "",
        };
      case "logout":
        return {
          ...state,
          ...action.payload,
          errorMessage: "",
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, defaultValue);

  const login = async (auth: Auth) => {
    try {
      const authentication = await authenticate(auth);
      const { user, profile } = jwtDecode(
        authentication.accessToken
      ) as UserToken;

      await SecureStore.setItemAsync("token", authentication.accessToken);
      await SecureStore.setItemAsync("user", user);
      await SecureStore.setItemAsync("profile", profile);

      dispatch({
        type: "login",
        payload: {
          token: authentication.accessToken,
          profile: profile,
          user: user,
          isLoading: false,
        },
      });
    } catch (err) {
      dispatch({
        type: "add_error",
        payload: "Houve um erro no login.",
      });
    }
  };

  const tryLocalLogin = async () => {
    try {
      const token = await SecureStore.getItemAsync("token");
      const user = await SecureStore.getItemAsync("user");
      const profile = await SecureStore.getItemAsync("profile");

      dispatch({
        type: "login",
        payload: {
          token,
          user,
          profile,
          isLoading: false,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const register = async (auth: Auth) => {
    try {
      const user = await registerUser(auth);
      if (user) {
        Alert.alert("Usuário criado! Faça login para começar a usar.");
        navigate("Login");
      }
      dispatch({
        type: "user_created",
        isLoading: false,
      });
    } catch (err) {
      dispatch({
        type: "add_error",
        payload: "Houve um erro no cadastro.",
      });
    }
  };

  const logout = async () => {
    try {
      await SecureStore.deleteItemAsync("token");
      await SecureStore.deleteItemAsync("user");
      await SecureStore.deleteItemAsync("profile");

      dispatch({
        type: "logout",
        payload: {
          token: "",
          profile: "",
          user: "",
          isLoading: false,
        },
      });
    } catch (err) {
      dispatch({
        type: "add_error",
        payload: "Houve um erro no logout.",
      });
    }
  };

  return (
    <Context.Provider
      value={{ ...state, login, tryLocalLogin, register, logout }}
    >
      {children}
    </Context.Provider>
  );
};

export { Provider, Context };
