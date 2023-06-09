import { useContext } from "react";
import { UserCircle, Chat, Heart, Trash } from "phosphor-react-native";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { THEME } from "../../theme";
import { Context as AuthContext } from "../../context/AuthContext";
import { Context as PostsContext } from "../../context/PostsContext";

interface PostItemProps {
  post: Post;
}

function PostItem({ post }: PostItemProps) {
  const { profile } = useContext(AuthContext);
  const { likePost, unlikePost, deletePost } = useContext(PostsContext);
  const isPostLiked = post.likes.includes(profile);

  async function handleLikePost() {
    if (isPostLiked) {
      unlikePost(post._id);
    } else {
      likePost(post._id);
    }
  }

  return (
    <View style={styles.postContainer} key={post._id}>
      <View style={styles.postDataContainer}>
        <UserCircle size={64} weight="light" color={THEME.COLORS.GRAY_LIGHT} />
        <View style={styles.postContentContainer}>
          <Text style={styles.textLg}>{post.profile.name}</Text>
          <Text style={styles.textMd}>{post.title}</Text>
          {post.image ? (
            <View style={styles.imageContainer}>
              <Image
                source={{
                  uri: post.description,
                }}
                style={styles.image}
              />
            </View>
          ) : (
            <Text style={styles.textSm}>{post.description}</Text>
          )}
          <View style={styles.footer}>
            <Chat size={32} color={THEME.COLORS.GRAY_LIGHT} />
            <Text style={styles.textMd}>{post.comments.length}</Text>
            <View>
              <TouchableOpacity onPress={handleLikePost}>
                <Heart
                  size={32}
                  weight={isPostLiked ? "fill" : "regular"}
                  color={isPostLiked ? "red" : THEME.COLORS.GRAY_LIGHT}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.textMd}>{post.likes.length}</Text>
          </View>
        </View>
        {post.profile._id == profile && (
          <TouchableOpacity onPress={() => deletePost(post._id)}>
            <Trash
              color={THEME.COLORS.GRAY_LIGHT}
              size={24}
              style={styles.trash}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

export default PostItem;
