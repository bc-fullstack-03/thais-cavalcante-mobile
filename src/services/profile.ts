import { api } from "./config";

export async function getProfile(profileId: string, authHeader: AuthHeader) {
  try {
    const { data } = await api.get(`/profiles/${profileId}`, authHeader);
    return data;
  } catch (err) {
    throw new Error(`Erro ao obter perfil: ${err.message}`);
  }
}

export async function getProfiles(authHeader: AuthHeader) {
  try {
    const { data } = await api.get("/profiles", authHeader);
    return data;
  } catch (err) {
    throw new Error(`Erro ao obter perfis: ${err.message}`);
  }
}

export async function followProfile(profileId: string, authHeader: AuthHeader) {
  try {
    await api.post(`/profiles/${profileId}/follow`, null, authHeader);
  } catch (err) {
    throw new Error(`Erro ao seguir perfil: ${err.message}`);
  }
}
