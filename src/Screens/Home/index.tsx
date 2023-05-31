import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Feed from "../Feed";
import CreatePost from "../CreatePost";

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
    </Stack.Navigator>
  );
}

export default Home;
