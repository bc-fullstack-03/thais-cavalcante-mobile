import { useState, useEffect, useContext } from "react";
import { SafeAreaView, FlatList, Text, View } from "react-native";
import { getAuthHeader } from "../../services/auth";
import { Context as AuthContext } from "../../context/AuthContext";
import { getProfiles } from "../../services/profile";
import ProfileItem from "../../components/ProfileItem";

import { styles } from "./styles";

function Friends() {
  const { profile } = useContext(AuthContext);
  const userProfileId = profile;
  const [profiles, setProfiles] = useState<Profile[]>([] as Profile[]);

  async function fetchProfiles() {
    const authHeader = await getAuthHeader();
    const allProfiles = await getProfiles(authHeader);
    const friends = allProfiles.filter(
      (profile: Profile) => profile._id != userProfileId
    );
    setProfiles(friends);
  }

  useEffect(() => {
    fetchProfiles();
  }, []);

  async function handleFriendsChanged() {
    await fetchProfiles();
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={profiles}
        keyExtractor={({ _id }) => _id}
        renderItem={({ item }) => (
          <ProfileItem
            profile={item}
            onProfileFollowed={handleFriendsChanged}
          />
        )}
      ></FlatList>
    </SafeAreaView>
  );
}

export default Friends;
