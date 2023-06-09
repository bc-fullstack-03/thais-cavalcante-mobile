import { useState, useEffect } from "react";
import { SafeAreaView, FlatList, Text, ActivityIndicator } from "react-native";
import { getAuthHeader } from "../../services/auth";
import { getProfile, getProfiles } from "../../services/profile";
import ProfileItem from "../../components/ProfileItem";

import { styles } from "./styles";
import { useRoute } from "@react-navigation/native";
import EmptyState from "../../components/EmptyState";
import { THEME } from "../../theme";

interface FollowersListRouteParams {
  profileId: string;
}

function FollowersList({ navigation }) {
  const route = useRoute();
  const { profileId } = route.params as FollowersListRouteParams;
  const [profile, setProfile] = useState<Profile>({} as Profile);
  const [followers, setFollowers] = useState<Profile[]>([] as Profile[]);
  const [loading, setLoading] = useState(true);

  async function fetchProfile() {
    const authHeader = await getAuthHeader();
    const profile = await getProfile(profileId, authHeader);
    setProfile(profile);
  }

  async function fetchFollowers() {
    const authHeader = await getAuthHeader();
    const allProfiles = await getProfiles(authHeader);

    const followers = allProfiles.filter((profile: Profile) => {
      return profile.following.some(
        (followingId: string) => followingId == profileId
      );
    });
    setFollowers(followers);
    setLoading(false);
  }

  useEffect(() => {
    fetchProfile();
    fetchFollowers();
  }, [profileId]);

  async function handleFriendsChanged() {
    await fetchFollowers();
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headingText}>Seguidores de @{profile.name}</Text>
      {loading ? (
        <ActivityIndicator
          style={styles.loading}
          size="large"
          color={THEME.COLORS.GRAY_LIGHT}
        />
      ) : followers.length > 0 ? (
        <FlatList
          data={followers}
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
        <EmptyState message={`@${profile.name} ainda não tem seguidores.`} />
      )}
    </SafeAreaView>
  );
}

export default FollowersList;
