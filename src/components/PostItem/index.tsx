import { useContext } from "react";
import { UserCircle, Chat, Heart } from "phosphor-react-native";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { THEME } from "../../theme";
import { Context as AuthContext } from "../../context/AuthContext";
import { likePost, unlikePost } from "../../services/post";
import { getAuthHeader } from "../../services/auth";

interface PostItemProps {
  post: Post;
  onPostChanged: () => void;
}

function PostItem({ post, onPostChanged }: PostItemProps) {
  const { profile } = useContext(AuthContext);
  const isPostLiked = post.likes.includes(profile);

  async function handleLikePost() {
    const authHeader = await getAuthHeader();
    if (isPostLiked) {
      await unlikePost(post._id, authHeader);
    } else {
      await likePost(post._id, authHeader);
    }

    onPostChanged();
  }

  return (
    <View style={styles.postContainer}>
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
      </View>
    </View>
  );
}

export default PostItem;
