import { api } from "./config";

export async function getProfile(profileId: string, authHeader: AuthHeader) {
  try {
    const { data } = await api.get(`/profiles/${profileId}`, authHeader);
    return data;
  } catch (err) {
    throw err;
  }
}

export async function getProfiles(authHeader: AuthHeader) {
  try {
    const { data } = await api.get("/profiles", authHeader);
    return data;
  } catch (err) {
    throw err;
  }
}
