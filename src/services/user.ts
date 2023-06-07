import { api } from "./config";

export async function updateUser(auth: Auth, authHeader: AuthHeader) {
  try {
    const { data } = await api.put("/users/me", auth, authHeader);
    return data;
  } catch (err) {
    throw err;
  }
}

export async function deleteUser(authHeader: AuthHeader) {
  try {
    await api.delete("/users/me", authHeader);
  } catch (err) {
    throw err;
  }
}
