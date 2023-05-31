import React, { useState, useEffect, useContext } from "react";
import { View, Text } from "react-native";
import { getAuthHeader } from "../../services/auth";
import { getProfile } from "../../services/profile";
import { Context as AuthContext } from "../../context/AuthContext";
import { UserCircle } from "phosphor-react-native";
import { THEME } from "../../theme";
import { styles } from "./styles";

function ProfileData() {
  const { profile, user } = useContext(AuthContext);
  const [userProfile, setUserProfile] = useState<Profile>({} as Profile);

  async function fetchProfile() {
    const authHeader = await getAuthHeader();
    const userProfile = await getProfile(profile, authHeader);
    setUserProfile(userProfile);
  }

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <>
      {userProfile && (
        <View style={styles.container}>
          <UserCircle
            size={128}
            weight="light"
            color={THEME.COLORS.GRAY_LIGHT}
          />
          <Text style={styles.textLg}>@{user}</Text>
          <Text style={styles.textMd}>{userProfile.name}</Text>
          <View>
            {userProfile.followers && userProfile.followers.length > 0 && (
              <Text style={styles.textMd}>
                {userProfile.followers.length} Seguidores
              </Text>
            )}
            {userProfile.following && userProfile.following.length > 0 && (
              <Text style={styles.textMd}>
                Seguindo {userProfile.following.length}
              </Text>
            )}
          </View>
        </View>
      )}
    </>
  );
}

export default ProfileData;
