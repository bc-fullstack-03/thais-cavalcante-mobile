import { useContext, useEffect } from "react";
import { Text, View } from "react-native";
import { Context as FeedContext } from "../../context/FeedContext";
import { SafeAreaView } from "react-native-safe-area-context";
import PostItem from "../../components/PostItem";
import { useRoute } from "@react-navigation/native";
import Button from "../../components/Button";
import Spacer from "../../components/Spacer";
import Comment from "../../components/Comment";
import { styles } from "./styles";

interface PostScreenRouteParams {
  postId: string;
}

function Post() {
  const route = useRoute();
  const { postId } = route.params as PostScreenRouteParams;
  const { post, getPost } = useContext(FeedContext);

  useEffect(() => {
    getPost(postId);
  }, []);

  return (
    <SafeAreaView>
      {post && (
        <>
          <PostItem post={post} />
          <Spacer />
          <View>
            {post.comments.length > 0 && (
              <>
                <Text style={styles.commentsHeading}>Comentários</Text>
                <Spacer />
                {post.comments.map((comment) => (
                  <Comment comment={comment} key={comment._id} />
                ))}
              </>
            )}
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

export default Post;
