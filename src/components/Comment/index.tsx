import { useContext } from "react";
import { UserCircle, Heart, Trash } from "phosphor-react-native";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { THEME } from "../../theme";
import { Context as AuthContext } from "../../context/AuthContext";
import { Context as PostsContext } from "../../context/PostsContext";

interface CommentProps {
  postId: string;
  comment: Comment;
}

function Comment({ postId, comment }: CommentProps) {
  const { deleteComment, likeComment, unlikeComment } =
    useContext(PostsContext);

  const { profile } = useContext(AuthContext);

  const isCommentLiked = comment.likes.includes(profile);

  async function handleLikeComment() {
    if (isCommentLiked) {
      unlikeComment(postId, comment._id);
    } else {
      likeComment(postId, comment._id);
    }
  }

  return (
    <View style={styles.commentContainer} key={comment._id}>
      {comment && (
        <View style={styles.commentDataContainer}>
          <UserCircle
            size={64}
            weight="light"
            color={THEME.COLORS.GRAY_LIGHT}
          />
          <View style={styles.commentContentContainer}>
            <Text style={styles.textLg}>{comment.profile.name}</Text>
            <Text style={styles.textSm}>{comment.description}</Text>
            <View style={styles.footer}>
              <View>
                <TouchableOpacity onPress={handleLikeComment}>
                  <Heart
                    size={32}
                    weight={isCommentLiked ? "fill" : "regular"}
                    color={isCommentLiked ? "red" : THEME.COLORS.GRAY_LIGHT}
                  />
                </TouchableOpacity>
              </View>
              <Text style={styles.textMd}>{comment.likes.length}</Text>
            </View>
          </View>
          {comment.profile._id == profile && (
            <TouchableOpacity
              onPress={() => {
                deleteComment(postId, comment._id);
              }}
            >
              <Trash
                color={THEME.COLORS.GRAY_LIGHT}
                size={24}
                style={styles.trash}
              />
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
}

export default Comment;
