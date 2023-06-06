import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ParamListBase } from "@react-navigation/native";
import FriendsList from "../FriendsList";
import FollowingList from "../FollowingList";
import FollowersList from "../FollowersList";

export type FriendsStackParamList = {
  FriendsList: { profileId: string };
  FollowingList: { profileId: string };
  FollowersList: { profileId: string };
} & ParamListBase;

const Stack = createNativeStackNavigator<FriendsStackParamList>();

function Friends() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="FriendsList" component={FriendsList} />
      <Stack.Screen name="FollowingList" component={FollowingList} />
      <Stack.Screen name="FollowersList" component={FollowersList} />
    </Stack.Navigator>
  );
}

export default Friends;
