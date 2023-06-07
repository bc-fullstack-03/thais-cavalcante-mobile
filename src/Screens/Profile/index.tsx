import { useContext } from "react";
import { Context as AuthContext } from "../../context/AuthContext";
import { Text, SafeAreaView, View, TouchableOpacity } from "react-native";
import Spacer from "../../components/Spacer";
import { styles } from "./styles";
import ProfileData from "../../components/ProfileData";
import UpdatePassword from "../../components/UpdatePassword";
import { deleteUser } from "../../services/user";
import { getAuthHeader } from "../../services/auth";
import DeleteUser from "../../components/DeleteUser";
import { SignOut } from "phosphor-react-native";
import { THEME } from "../../theme";

function Profile() {
  const { logout } = useContext(AuthContext);

  async function handleDeleteUser() {
    const authHeader = await getAuthHeader();
    await deleteUser(authHeader);
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View>
          <ProfileData />
          <Spacer />
          <TouchableOpacity style={styles.logoutContainer} onPress={logout}>
            <SignOut color={THEME.COLORS.GRAY_LIGHT} size={36} />
            <Text style={styles.textMd}>Sair</Text>
          </TouchableOpacity>
        </View>
        <UpdatePassword />
        <DeleteUser />
      </View>
    </SafeAreaView>
  );
}

export default Profile;
