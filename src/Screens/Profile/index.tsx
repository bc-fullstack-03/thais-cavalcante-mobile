import { useContext } from "react";
import { Context as AuthContext } from "../../context/AuthContext";
import { Text, SafeAreaView, View } from "react-native";
import Button from "../../components/Button";
import Spacer from "../../components/Spacer";
import { styles } from "./styles";
import ProfileData from "../../components/ProfileData";

function Profile() {
  const { logout, errorMessage } = useContext(AuthContext);

  return (
    <SafeAreaView>
      <ProfileData />
      <Button title="Sair" onPress={logout} />
      {errorMessage && (
        <Spacer>
          <Text style={styles.error}>{errorMessage}</Text>
        </Spacer>
      )}
    </SafeAreaView>
  );
}

export default Profile;
