import { useContext } from "react";
import { Context as AuthContext } from "../../context/AuthContext";
import { Text, Alert, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { deleteUser } from "../../services/user";
import { getAuthHeader } from "../../services/auth";
import { Trash } from "phosphor-react-native";
import { THEME } from "../../theme";

function DeleteUser() {
  const { logout } = useContext(AuthContext);
  function showDeleteConfirmation() {
    Alert.alert("Confirmação", "Tem certeza de que deseja excluir sua conta?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Excluir", onPress: handleDeleteUser },
    ]);
  }
  async function handleDeleteUser() {
    const authHeader = await getAuthHeader();
    await deleteUser(authHeader);
    Alert.alert("Conta excluída com sucesso.");
    logout();
  }

  return (
    <TouchableOpacity onPress={showDeleteConfirmation} style={styles.container}>
      <Trash size={32} color={THEME.COLORS.GRAY_LIGHT} />
      <Text style={styles.textMd}>Excluir sua conta do Sysmap Parrot</Text>
    </TouchableOpacity>
  );
}

export default DeleteUser;
