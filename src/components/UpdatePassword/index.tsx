import { useState, useContext } from "react";
import { Context as AuthContext } from "../../context/AuthContext";
import { getAuthHeader, getUser } from "../../services/auth";
import { updateUser } from "../../services/user";
import Button from "../Button";
import { Lock } from "phosphor-react-native";
import { Alert, Text, View } from "react-native";
import { Input } from "../input";
import { styles } from "./styles";
import Spacer from "../Spacer";

function UpdatePassword() {
  const { logout } = useContext(AuthContext);
  const [newPassword, setNewPassword] = useState<string>("");
  const [repeatedNewPassword, setRepeatedNewPassword] = useState<string>("");

  async function handleUpdatePassword() {
    try {
      const authHeader = await getAuthHeader();
      const loggedInUser = await getUser();

      if (newPassword !== repeatedNewPassword) {
        Alert.alert("Senhas são incompatíveis");
      } else {
        const auth = {
          user: loggedInUser,
          password: newPassword,
        };

        const userUpdated = await updateUser(auth, authHeader);

        if (userUpdated) {
          Alert.alert("Senha alterada com sucesso, faça o login novamente");
          logout();
        }
      }
    } catch (error) {
      console.log("Error:", error);
      Alert.alert("Ocorreu um erro ao atualizar a senha");
    }
  }

  return (
    <View>
      <Text style={styles.textMd}>Atualizar Senha</Text>
      <Text style={styles.textSm}>Sua Nova Senha</Text>
      <Input.Root>
        <Input.Icon>
          <Lock color="#7C7C8A" size={24} />
        </Input.Icon>
        <Input.Input
          placeholder="Digite sua nova senha"
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
        ></Input.Input>
      </Input.Root>
      <Spacer />
      <Text style={styles.textSm}>Repita sua nova Senha</Text>
      <Input.Root>
        <Input.Icon>
          <Lock color="#7C7C8A" size={24} />
        </Input.Icon>
        <Input.Input
          placeholder="Digite sua nova senha"
          autoComplete="off"
          secureTextEntry
          value={repeatedNewPassword}
          onChangeText={setRepeatedNewPassword}
        ></Input.Input>
      </Input.Root>
      <Spacer />
      <Button title="Atualizar" onPress={handleUpdatePassword} />
    </View>
  );
}

export default UpdatePassword;
