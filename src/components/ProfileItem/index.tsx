import { Text, View } from "react-native";
import { UserCircle } from "phosphor-react-native";
import { THEME } from "../../theme";
import Button from "../../components/Button";

import { styles } from "./styles";

interface ProfileItemProps {
  profile: Profile;
}

function ProfileItem({ profile }: ProfileItemProps) {
  return (
    <View style={styles.profileCard}>
      <View style={styles.profileIdentification}>
        <UserCircle color={THEME.COLORS.GRAY_LIGHT} size={32} />
        <Text style={styles.profileNameText}>{profile.name}</Text>
      </View>
      <Text style={styles.followers}>
        {profile.followers.length} Seguidores
      </Text>
      <Text style={styles.following}>Seguindo {profile.following.length}</Text>
      <Button title="Seguir" onPress={() => {}} />
    </View>
  );
}

export default ProfileItem;
