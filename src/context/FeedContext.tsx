import React, { ReactNode, useReducer } from "react";
import { getAuthHeader } from "../services/auth";
import { getPosts, likePostById, unlikePostById } from "../services/post";
import * as SecureStore from "expo-secure-store";

interface FeedContext {
  feed: Post[];
  getFeed?: (page: number) => void;
  likePost?: (postId: string) => void;
  unlikePost?: (postId: string) => void;
}

const defaultValue: FeedContext = {
  feed: [],
};

const Context = React.createContext<FeedContext>(defaultValue);

const Provider = ({ children }: { children: ReactNode }) => {
  const reducer = (state: FeedContext, action) => {
    switch (action.type) {
      case "show_feed":
        return {
          ...state,
          feed: action.payload,
        };
      case "like_post":
        const newPostsLike = state.feed;
        const [postLiked, ..._] = newPostsLike.filter(
          (post) => post._id == action.payload.id
        );
        postLiked.likes.push(action.payload.profile);
        return {
          feed: [...newPostsLike],
        };
      case "unlike_post":
        const newPostsUnlike = state.feed;
        const [postUnliked, ...rest] = newPostsUnlike.filter(
          (post) => post._id == action.payload.id
        );
        const index = postUnliked.likes.indexOf(action.payload.profile);
        postUnliked.likes.splice(index, 1);
        return { feed: [...newPostsUnlike] };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, defaultValue);

  const getFeed = async (page?: number) => {
    try {
      const authHeader = await getAuthHeader();
      const feed = await getPosts(page || 0, authHeader);

      dispatch({ type: "show_feed", payload: feed });
    } catch (err) {}
  };

  const likePost = async (postId: string) => {
    try {
      const authHeader = await getAuthHeader();
      await likePostById(postId, authHeader);
      const profile = await SecureStore.getItemAsync("profile");
      dispatch({ type: "like_post", payload: { id: postId, profile } });
    } catch (err) {}
  };

  const unlikePost = async (postId: string) => {
    try {
      const authHeader = await getAuthHeader();
      await unlikePostById(postId, authHeader);
      const profile = await SecureStore.getItemAsync("profile");
      dispatch({ type: "unlike_post", payload: { id: postId, profile } });
    } catch (err) {}
  };

  return (
    <Context.Provider value={{ ...state, getFeed, likePost, unlikePost }}>
      {children}
    </Context.Provider>
  );
};

export { Provider, Context };
