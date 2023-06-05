import { useContext, useState } from "react";
import { Text, View } from "react-native";
import { Context as AuthContext } from "../../context/AuthContext";
import { Context as FeedContext } from "../../context/FeedContext";

import PostImagePicker from "../../components/PostImagePicker";
import { SafeAreaView } from "react-native-safe-area-context";
import PostItem from "../../components/PostItem";
import { useRoute } from "@react-navigation/native";

interface PostScreenRouteParams {
  post: Post;
}

function Post() {
  const route = useRoute();
  const { post } = route.params as PostScreenRouteParams;

  return (
    <SafeAreaView>
      <PostItem post={post} />
    </SafeAreaView>
  );
}

export default Post;
