import { api } from "./config";
import * as SecureStore from "expo-secure-store";

export async function getPosts(page: number, authHeader: AuthHeader) {
  try {
    const { data } = await api.get(`/feed?page=${page}`, authHeader);
    return data;
  } catch (err) {
    throw new Error(`Erro ao obter posts: ${err.message}`);
  }
}

export async function likePostById(postId: string, authHeader: AuthHeader) {
  try {
    await api.post(`/posts/${postId}/like`, null, authHeader);
  } catch (err) {
    throw new Error(`Erro ao curtir post: ${err.message}`);
  }
}

export async function unlikePostById(postId: string, authHeader: AuthHeader) {
  try {
    await api.post(`/posts/${postId}/unlike`, null, authHeader);
  } catch (err) {
    throw new Error(`Erro ao remover curtida do post: ${err.message}`);
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
    throw new Error(`Erro ao tentar criar post: ${err.message}`);
  }
}

export async function deletePostById(id: string, authHeader: AuthHeader) {
  try {
    await api.delete(`/posts/${id}`, authHeader);
  } catch (err) {
    throw new Error(`Erro ao deletar post: ${err.message}`);
  }
}

export async function getPostById(id: string, authHeader: AuthHeader) {
  try {
    const { data } = await api.get(`/posts/${id}`, authHeader);
    return data;
  } catch (err) {
    throw new Error(`Erro ao obter post: ${err.message}`);
  }
}

export async function createCommentToPost(
  postId: string,
  commentDescription: string,
  authHeader: AuthHeader
) {
  try {
    const { data } = await api.post(
      `/posts/${postId}/comments`,
      {
        description: commentDescription,
      },
      authHeader
    );
    return data;
  } catch (err) {
    throw new Error(`Erro ao tenatr criar comentário: ${err.message}`);
  }
}

export async function removeComment(
  postId: string,
  commentId: string,
  authHeader: AuthHeader
) {
  try {
    await api.delete(`/posts/${postId}/comments/${commentId}`, authHeader);
  } catch (err) {
    throw new Error(`Erro ao deletar comentário: ${err.message}`);
  }
}

export async function likePostComment(
  postId: string,
  commentId: string,
  authHeader: AuthHeader
) {
  try {
    await api.post(
      `/posts/${postId}/comments/${commentId}/like`,
      null,
      authHeader
    );
  } catch (err) {
    throw new Error(`Erro ao curtir comentário: ${err.message}`);
  }
}

export async function unlikePostComment(
  postId: string,
  commentId: string,
  authHeader: AuthHeader
) {
  try {
    await api.post(
      `/posts/${postId}/comments/${commentId}/unlike`,
      null,
      authHeader
    );
  } catch (err) {
    throw new Error(`Erro ao remover curtida do comentário: ${err.message}`);
  }
}
