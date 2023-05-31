import { useState, useEffect, useContext } from "react";
import { UserCircle } from "phosphor-react-native";
import { View, Text, ScrollView, SafeAreaView } from "react-native";
import { styles } from "./styles";
import PostItem from "../../components/PostItem";
import { THEME } from "../../theme";
import { Context as AuthContext } from "../../context/AuthContext";
import { FeedContext } from "../../context/FeedContext";
import Button from "../../components/Button";

function Feed({ navigation }) {
  const { user } = useContext(AuthContext);
  const { feed, getFeed } = useContext(FeedContext);
  const [currentPage, setCurrentPage] = useState<number>(0);

  useEffect(() => {
    getFeed(currentPage);
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.userContainer}>
          <UserCircle
            weight="light"
            size={64}
            color={THEME.COLORS.GRAY_LIGHT}
          />
          <Text style={styles.text}>@{user}</Text>
          <Button
            title="Novo Post"
            onPress={() => navigation.navigate("CreatePost")}
          />
        </View>
        {feed &&
          feed.map((post: Post) => (
            <PostItem
              post={post}
              key={post._id}
              onPostChanged={() => getFeed(currentPage)}
            />
          ))}
      </ScrollView>
    </SafeAreaView>
  );
}

export default Feed;
