import { useContext } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { UserCircle } from "phosphor-react-native";
import { THEME } from "../../theme";
import Button from "../../components/Button";
import { getAuthHeader } from "../../services/auth";
import { followProfile } from "../../services/profile";
import { Context as AuthContext } from "../../context/AuthContext";
import { Context as PostsContext } from "../../context/PostsContext";

import { styles } from "./styles";
import { NavigationProp } from "@react-navigation/native";
import { FriendsStackParamList } from "../../Screens/Friends";

interface ProfileItemProps {
  profile: Profile;
  onProfileFollowed: () => void;
  navigation: NavigationProp<FriendsStackParamList>;
}

function ProfileItem({
  profile,
  onProfileFollowed,
  navigation,
}: ProfileItemProps) {
  const { getFeed } = useContext(PostsContext);
  const { profile: userProfileId } = useContext(AuthContext);
  const isProfileFollowed = profile.followers.includes(userProfileId);

  async function handlefollowProfile() {
    const authHeader = await getAuthHeader();
    await followProfile(profile._id, authHeader);
    getFeed(0);

    onProfileFollowed();
  }

  return (
    <View style={styles.profileCard}>
      <View style={styles.profileIdentification}>
        <UserCircle color={THEME.COLORS.GRAY_LIGHT} weight="light" size={64} />
        <Text style={styles.profileNameText}>{profile.name}</Text>
      </View>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("FollowersList", { profileId: profile._id })
        }
      >
        <Text style={styles.followers}>
          {profile.followers.length} Seguidores
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("FollowingList", { profileId: profile._id })
        }
      >
        <Text style={styles.following}>
          Seguindo {profile.following.length}
        </Text>
      </TouchableOpacity>
      {profile._id != userProfileId && (
        <Button
          style={isProfileFollowed ? styles.disabledButton : styles.button}
          disabled={isProfileFollowed}
          title={isProfileFollowed ? "Seguindo" : "Seguir"}
          onPress={handlefollowProfile}
        />
      )}
    </View>
  );
}

export default ProfileItem;
