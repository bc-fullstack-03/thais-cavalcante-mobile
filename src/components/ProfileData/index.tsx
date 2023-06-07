import React, { useEffect, useContext } from "react";
import { View, Text } from "react-native";
import { Context as AuthContext } from "../../context/AuthContext";
import { Context as ProfilesContext } from "../../context/ProfilesContext";
import { UserCircle } from "phosphor-react-native";
import { THEME } from "../../theme";
import { styles } from "./styles";

function ProfileData() {
  const { profile: userProfileId, user } = useContext(AuthContext);
  const { profile, getProfile } = useContext(ProfilesContext);

  useEffect(() => {
    getProfile(userProfileId);
  }, []);

  return (
    <>
      {profile && (
        <View style={styles.container}>
          <UserCircle
            size={128}
            weight="light"
            color={THEME.COLORS.GRAY_LIGHT}
          />
          <Text style={styles.textLg}>@{user}</Text>
          <View style={styles.followersContainer}>
            {profile.followers && profile.followers.length > 0 && (
              <Text style={styles.textMd}>
                {profile.followers.length} Seguidores
              </Text>
            )}
            {profile.following && profile.following.length > 0 && (
              <Text style={styles.textMd}>
                Seguindo {profile.following.length}
              </Text>
            )}
          </View>
        </View>
      )}
    </>
  );
}

export default ProfileData;
