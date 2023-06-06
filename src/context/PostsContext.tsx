import React, { ReactNode, useReducer } from "react";
import { getAuthHeader, getProfile, getUser } from "../services/auth";
import { navigate } from "../RootNavigation";
import {
  addPost,
  createCommentToPost,
  deletePostById,
  getPostById,
  getPosts,
  likePostById,
  removeComment,
  unlikePostById,
} from "../services/post";
import * as SecureStore from "expo-secure-store";

interface PostsContext {
  feed?: Post[];
  post?: Post;
  getFeed?: (page: number) => void;
  likePost?: (postId: string) => void;
  unlikePost?: (postId: string) => void;
  hasMorePosts?: boolean;
  createPost?: (postData: CreatePostRequest) => void;
  deletePost?: (postId: string) => void;
  getPost?: (postId: string) => void;
  createComment?: (postId: string, description: string) => void;
  deleteComment?: (postId: string, commentId: string) => void;
}

const defaultValue: PostsContext = {
  feed: [],
};

const Context = React.createContext<PostsContext>(defaultValue);

const Provider = ({ children }: { children: ReactNode }) => {
  const reducer = (state: PostsContext, action) => {
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
        const newPostLike = state.post;
        newPostLike.likes.push(action.payload.profile);
        return {
          feed: [...newPostsLike],
          post: newPostLike,
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

        const newPostUnlike = state.post;
        const postUnlikeIndex = newPostUnlike.likes.indexOf(
          action.payload.profile
        );
        newPostUnlike.likes.splice(postUnlikeIndex, 1);
        return { feed: [...newPostsUnlike], post: newPostUnlike };
      case "create_post":
        return {
          feed: [action.payload, ...state.feed],
        };
      case "delete_post":
        const posts = state.feed;
        const updatedFeed = posts.filter(
          (post) => post._id != action.payload.id
        );
        return { feed: updatedFeed };
      case "get_post":
        return {
          ...state,
          post: action.payload,
        };
      case "create_comment":
        const feed = state.feed;
        const [postCommented, ...__] = feed.filter(
          (post) => post._id == action.payload.id
        );
        postCommented.comments.push(action.payload.comment.profile._id);
        const newPostComment = state.post;
        newPostComment.comments.push(action.payload.comment);
        return {
          feed: [...feed],
          post: newPostComment,
        };
      case "delete_comment":
        const deleteCommentFeed = state.feed;
        const [deleteCommentPost, ...___] = deleteCommentFeed.filter(
          (post) => post._id == action.payload.postId
        );
        const commentToDeleteIndex = deleteCommentPost.comments.indexOf(
          action.payload.commentId
        );
        deleteCommentPost.comments.splice(commentToDeleteIndex, 1);

        deleteCommentPost.comments.filter(
          (comment) => comment != action.payload.commentId
        );
        const post = state.post;
        const updatedComments = post.comments.filter(
          (comment) => comment._id != action.payload.commentId
        );
        return {
          feed: [...deleteCommentFeed],
          post: { ...post, comments: updatedComments.reverse() },
        };
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
      navigate("Feed");
      dispatch({ type: "delete_post", payload: { id: postId } });
    } catch (err) {}
  };

  const getPost = async (postId: string) => {
    try {
      const authHeader = await getAuthHeader();
      const post = await getPostById(postId, authHeader);
      dispatch({ type: "get_post", payload: post });
    } catch (err) {}
  };

  const createComment = async (postId: string, description: string) => {
    try {
      const user = await getUser();
      const profileId = await getProfile();
      const authHeader = await getAuthHeader();
      const comment = await createCommentToPost(
        postId,
        description,
        authHeader
      );
      dispatch({
        type: "create_comment",
        payload: {
          id: postId,
          comment: { ...comment, profile: { name: user, _id: profileId } },
        },
      });
    } catch (err) {}
  };

  const deleteComment = async (postId: string, commentId: string) => {
    try {
      const authHeader = await getAuthHeader();
      await removeComment(postId, commentId, authHeader);
      dispatch({ type: "delete_comment", payload: { postId, commentId } });
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
        getPost,
        createComment,
        deleteComment,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { Provider, Context };
