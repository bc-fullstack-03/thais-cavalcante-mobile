import { useState, useEffect } from "react";
import { SafeAreaView, FlatList, Text, ActivityIndicator } from "react-native";
import { getAuthHeader } from "../../services/auth";
import { getProfile, getProfiles } from "../../services/profile";
import ProfileItem from "../../components/ProfileItem";

import { styles } from "./styles";
import { useRoute } from "@react-navigation/native";
import EmptyState from "../../components/EmptyState";
import { THEME } from "../../theme";

interface FollowingListRouteParams {
  profileId: string;
}

function FollowingList({ navigation }) {
  const route = useRoute();
  const { profileId } = route.params as FollowingListRouteParams;
  const [profile, setProfile] = useState<Profile>({} as Profile);
  const [following, setFollowing] = useState<Profile[]>([] as Profile[]);
  const [loading, setLoading] = useState(true);

  async function fetchProfile() {
    const authHeader = await getAuthHeader();
    const profile = await getProfile(profileId, authHeader);
    setProfile(profile);
  }

  async function fetchFollowing() {
    const authHeader = await getAuthHeader();
    const allProfiles = await getProfiles(authHeader);

    const following = allProfiles.filter((profile: Profile) => {
      return profile.followers.some(
        (followerId: string) => followerId == profileId
      );
    });
    setFollowing(following);
    setLoading(false);
  }

  useEffect(() => {
    fetchProfile();
    fetchFollowing();
  }, [profileId]);

  async function handleFriendsChanged() {
    await fetchFollowing();
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headingText}>Perfis que @{profile.name} segue</Text>
      {loading ? (
        <ActivityIndicator
          style={styles.loading}
          size="large"
          color={THEME.COLORS.GRAY_LIGHT}
        />
      ) : following.length > 0 ? (
        <FlatList
          data={following}
          keyExtractor={({ _id }) => _id}
          renderItem={({ item }) => (
            <ProfileItem
              profile={item}
              onProfileFollowed={handleFriendsChanged}
              navigation={navigation}
            />
          )}
        ></FlatList>
      ) : (
        <EmptyState message={`@${profile.name} ainda não segue ninguém.`} />
      )}
    </SafeAreaView>
  );
}

export default FollowingList;
