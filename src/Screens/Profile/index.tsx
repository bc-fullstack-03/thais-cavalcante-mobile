import { useContext } from "react";
import { Context as AuthContext } from "../../context/AuthContext";
import { Text, SafeAreaView, View } from "react-native";
import Button from "../../components/Button";
import Spacer from "../../components/Spacer";
import { styles } from "./styles";
import ProfileData from "../../components/ProfileData";
import UpdatePassword from "../../components/UpdatePassword";

function Profile() {
  const { logout, errorMessage } = useContext(AuthContext);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <ProfileData />
        <Button title="Sair" onPress={logout} />
        {errorMessage && (
          <Spacer>
            <Text style={styles.error}>{errorMessage}</Text>
          </Spacer>
        )}
        <Spacer />
        <UpdatePassword />
      </View>
    </SafeAreaView>
  );
}

export default Profile;
