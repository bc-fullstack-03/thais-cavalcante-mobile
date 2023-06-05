import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Feed from "../Feed";
import CreatePost from "../CreatePost";
import Post from "../Post";

const Stack = createNativeStackNavigator();

function Home() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Feed" component={Feed} />
      <Stack.Screen name="CreatePost" component={CreatePost} />
      <Stack.Screen name="Post" component={Post} />
    </Stack.Navigator>
  );
}

export default Home;
