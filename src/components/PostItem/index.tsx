import { useContext } from "react";
import { UserCircle, Chat, Heart } from "phosphor-react-native";
import { Image, Text, View } from "react-native";
import { styles } from "./styles";
import { THEME } from "../../theme";
import { Context as AuthContext } from "../../context/AuthContext";

interface PostItemProps {
  post: Post;
}

function PostItem({ post }: PostItemProps) {
  const { profile } = useContext(AuthContext);
  const isPostLiked = post.likes.includes(profile);

  return (
    <View style={styles.postContainer}>
      <View style={styles.postContentContainer}>
        <UserCircle size={64} weight="light" color={THEME.COLORS.GRAY_LIGHT} />
        <View>
          <Text style={styles.textLg}>{post.profile.name}</Text>
          <Text style={styles.textMd}>{post.title}</Text>
          {post.image ? (
            <Image
              source={{ uri: post.description }}
              style={{ width: 150, height: 150 }}
            ></Image>
          ) : (
            <Text style={styles.textSm}>{post.description}</Text>
          )}
          <View style={styles.footer}>
            <Chat size={32} color={THEME.COLORS.GRAY_LIGHT} />
            <Text style={styles.textMd}>{post.comments.length}</Text>
            <View>
              <Heart
                size={32}
                weight={isPostLiked ? "fill" : "regular"}
                color={isPostLiked ? "red" : THEME.COLORS.GRAY_LIGHT}
              />
            </View>
            <Text style={styles.textMd}>{post.likes.length}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

export default PostItem;
