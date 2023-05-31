import { api } from "./config";

export async function getProfile(profileId: string, authHeader: AuthHeader) {
  try {
    const { data } = await api.get(`/profiles/${profileId}`, authHeader);
    return data;
  } catch (err) {
    throw err;
  }
}
