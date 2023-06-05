import { api } from "./config";
import * as SecureStore from "expo-secure-store";

export async function getPosts(page: number, authHeader: AuthHeader) {
  try {
    const { data } = await api.get(`/feed?page=${page}`, authHeader);
    return data;
  } catch (err) {
    throw err;
  }
}

export async function likePostById(postId: string, authHeader: AuthHeader) {
  try {
    await api.post(`/posts/${postId}/like`, null, authHeader);
  } catch (err) {
    alert("Erro ao curtir post");
  }
}

export async function unlikePostById(postId: string, authHeader: AuthHeader) {
  try {
    await api.post(`/posts/${postId}/unlike`, null, authHeader);
  } catch (err) {
    alert("Erro ao remover curtida do post");
  }
}

export async function addPost(post: FormData) {
  try {
    const token = await SecureStore.getItemAsync("token");
    const { data } = await api.post("/posts", post, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token} `,
      },
    });
    return data;
  } catch (err) {
    alert("Erro ao tentar criar post");
  }
}
