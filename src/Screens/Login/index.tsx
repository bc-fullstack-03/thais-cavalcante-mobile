import { TouchableOpacity, Text } from "react-native";
import AuthForm from "../../components/AuthForm";

import { styles } from "./styles";

function Login({ navigation }) {
  return (
    <>
      <AuthForm
        authFormTitle="Faça login e comece a usar!"
        submitFormButtonText="Entrar"
      />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Register");
        }}
      >
        <Text style={styles.link}>Não possui conta? Crie uma agora!</Text>
      </TouchableOpacity>
    </>
  );
}

export default Login;
