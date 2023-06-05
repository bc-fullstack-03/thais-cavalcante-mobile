import { useState, useEffect, useContext } from "react";
import { CaretCircleDown, UserCircle } from "phosphor-react-native";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { styles } from "./styles";
import PostItem from "../../components/PostItem";
import { THEME } from "../../theme";
import { Context as AuthContext } from "../../context/AuthContext";
import { Context as PostsContext } from "../../context/PostsContext";
import Button from "../../components/Button";
import Spacer from "../../components/Spacer";

function Feed({ navigation }) {
  const { user } = useContext(AuthContext);
  const { feed, getFeed, hasMorePosts } = useContext(PostsContext);
  const [currentPage, setCurrentPage] = useState<number>(0);

  useEffect(() => {
    getFeed(currentPage);
  }, []);

  function handleNextPage() {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    getFeed(nextPage);
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.headingContainer}>
          <View style={styles.userContainer}>
            <UserCircle
              weight="light"
              size={64}
              color={THEME.COLORS.GRAY_LIGHT}
            />
            <Text style={styles.text}>@{user}</Text>
          </View>
          <Button
            title="Novo Post"
            style={styles.createPostButton}
            onPress={() => navigation.navigate("CreatePost")}
          />
        </View>
        {feed &&
          feed.map((post: Post) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Post", { postId: post._id })}
              key={post._id}
            >
              <PostItem post={post} />
            </TouchableOpacity>
          ))}
        {hasMorePosts && (
          <>
            <Spacer />
            <TouchableOpacity
              onPress={handleNextPage}
              style={styles.loadMorePostButton}
            >
              <CaretCircleDown
                size={48}
                weight="fill"
                color={THEME.COLORS.CYAN}
              />
            </TouchableOpacity>
            <Spacer />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

export default Feed;
