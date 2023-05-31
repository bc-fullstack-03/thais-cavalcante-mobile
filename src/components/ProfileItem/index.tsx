import { useContext } from "react";
import { Text, View } from "react-native";
import { UserCircle } from "phosphor-react-native";
import { THEME } from "../../theme";
import Button from "../../components/Button";
import { getAuthHeader } from "../../services/auth";
import { followProfile } from "../../services/profile";
import { Context as AuthContext } from "../../context/AuthContext";

import { styles } from "./styles";

interface ProfileItemProps {
  profile: Profile;
  onProfileFollowed: () => void;
}

function ProfileItem({ profile, onProfileFollowed }: ProfileItemProps) {
  const { profile: userProfileId } = useContext(AuthContext);
  const isProfileFollowed = profile.followers.includes(userProfileId);

  async function handlefollowProfile() {
    const authHeader = await getAuthHeader();
    await followProfile(profile._id, authHeader);

    onProfileFollowed();
  }

  return (
    <View style={styles.profileCard}>
      <View style={styles.profileIdentification}>
        <UserCircle color={THEME.COLORS.GRAY_LIGHT} weight="light" size={64} />
        <Text style={styles.profileNameText}>{profile.name}</Text>
      </View>
      <Text style={styles.followers}>
        {profile.followers.length} Seguidores
      </Text>
      <Text style={styles.following}>Seguindo {profile.following.length}</Text>
      <Button
        style={isProfileFollowed ? styles.disabledButton : styles.button}
        disabled={isProfileFollowed}
        title={isProfileFollowed ? "Seguindo" : "Seguir"}
        onPress={handlefollowProfile}
      />
    </View>
  );
}

export default ProfileItem;
