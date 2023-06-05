import React, { ReactNode, useReducer } from "react";
import { getAuthHeader, getProfile, getUser } from "../services/auth";
import { navigate } from "../RootNavigation";
import {
  addPost,
  deletePostById,
  getPosts,
  likePostById,
  unlikePostById,
} from "../services/post";
import * as SecureStore from "expo-secure-store";

interface FeedContext {
  feed: Post[];
  getFeed?: (page: number) => void;
  likePost?: (postId: string) => void;
  unlikePost?: (postId: string) => void;
  hasMorePosts?: boolean;
  createPost?: (postData: CreatePostRequest) => void;
  deletePost?: (postId: string) => void;
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
          hasMorePosts: action.hasMorePosts,
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
        const postToUnlikeIndex = postUnliked.likes.indexOf(
          action.payload.profile
        );
        postUnliked.likes.splice(postToUnlikeIndex, 1);
        return { feed: [...newPostsUnlike] };
      case "create_post":
        console.log([action.payload, ...state.feed]);
        return {
          feed: [action.payload, ...state.feed],
        };
      case "delete_post":
        const posts = state.feed;
        const postToDeleteIndex = posts.filter(
          (post) => post._id != action.payload.id
        );
        return { feed: postToDeleteIndex };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, defaultValue);

  const getFeed = async (page: number) => {
    try {
      const authHeader = await getAuthHeader();
      let feed = [];

      const previousFeedSize = state.feed.length;

      for (let i = 0; i <= page; i++) {
        const posts = await getPosts(i, authHeader);

        feed = [...feed, ...posts];
      }

      const hasMorePosts = feed.length > previousFeedSize;

      dispatch({ type: "show_feed", payload: feed, hasMorePosts });
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

  const createPost = async ({ title, description, image }) => {
    try {
      const user = await getUser();
      const profileId = await getProfile();
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description || "");
      formData.append("file", image);
      const post = await addPost(formData);
      dispatch({
        type: "create_post",
        payload: { ...post, profile: { name: user, _id: profileId } },
      });
      navigate("Feed");
    } catch (err) {
      console.log(err.message);
    }
  };

  const deletePost = async (postId: string) => {
    try {
      const authHeader = await getAuthHeader();
      await deletePostById(postId, authHeader);
      dispatch({ type: "delete_post", payload: { id: postId } });
    } catch (err) {}
  };

  return (
    <Context.Provider
      value={{
        ...state,
        getFeed,
        likePost,
        unlikePost,
        createPost,
        deletePost,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { Provider, Context };
