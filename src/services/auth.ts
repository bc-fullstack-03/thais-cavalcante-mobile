import * as SecureStore from "expo-secure-store";
import { api } from "./config";

export async function getAuthHeader() {
  const token = await SecureStore.getItemAsync("token");
  const authHeader = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return authHeader;
}

export async function authenticate(auth: Auth) {
  try {
    const { data } = await api.post("/security/login", auth);
    return data;
  } catch (err) {
    alert("Erro ao fazer login do usuário.");
  }
}

export async function registerUser(auth: Auth) {
  try {
    const { data } = await api.post("/security/register", auth);
    return data;
  } catch (err) {
    alert("Erro na criação do usuário.");
  }
}

export async function getProfile() {
  const profile = await SecureStore.getItemAsync("profile");
  return profile;
}

export async function getUser() {
  const user = await SecureStore.getItemAsync("user");
  return user;
}
