import { useContext, useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { Context as PostsContext } from "../../context/PostsContext";
import { SafeAreaView } from "react-native-safe-area-context";
import PostItem from "../../components/PostItem";
import { useRoute } from "@react-navigation/native";
import Button from "../../components/Button";
import Spacer from "../../components/Spacer";
import Comment from "../../components/Comment";
import { styles } from "./styles";
import { Input } from "../../components/input";

interface PostScreenRouteParams {
  postId: string;
}

function Post() {
  const route = useRoute();
  const { postId } = route.params as PostScreenRouteParams;
  const { post, getPost, createComment } = useContext(PostsContext);
  const [commentDescription, setCommentDescription] = useState<string>("");

  useEffect(() => {
    getPost(postId);
  }, []);

  function handleCreateComment() {
    createComment(postId, commentDescription);
  }

  return (
    <SafeAreaView>
      <ScrollView>
        {post && (
          <>
            <PostItem post={post} />
            <Spacer />
            <View>
              <Text style={styles.commentsHeading}>Adicionar Comentário</Text>
              <Spacer />
              <Input.Root>
                <Input.Input
                  placeholder="Escreva seu comentário"
                  value={commentDescription}
                  onChangeText={setCommentDescription}
                />
              </Input.Root>
              <Spacer />
              <Button title="Adicionar" onPress={handleCreateComment} />
              <Spacer />
              {post.comments.length > 0 && (
                <>
                  <Text style={styles.commentsHeading}>Comentários</Text>
                  <Spacer />
                  {post.comments.reverse().map((comment) => (
                    <Comment comment={comment} key={comment._id} />
                  ))}
                </>
              )}
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

export default Post;
