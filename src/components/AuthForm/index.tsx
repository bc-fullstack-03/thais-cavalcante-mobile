import React, { useState } from "react";
import { Image, KeyboardAvoidingView, Platform } from "react-native";

import { styles } from "./styles";
import Heading from "../Heading";
import { Input } from "../input";
import { At, IdentificationCard, Lock } from "phosphor-react-native";
import Spacer from "../Spacer";
import { THEME } from "../../theme";
import Button from "../Button";
import logo from "../../assets/logo.png";

interface AuthFormProps {
  authFormTitle: string;
  submitFormButtonText: string;
  submitFormButtonAction: (auth: Auth) => void;
  isRegister?: boolean;
}

function AuthForm({
  authFormTitle,
  submitFormButtonText,
  submitFormButtonAction,
  isRegister,
}: AuthFormProps) {
  const [name, setName] = useState<string>("");
  const [user, setUser] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = () => {
    const authData: { user: string; password: string; name?: string } = {
      user,
      password,
    };

    if (isRegister) {
      authData.name = name;
    }

    submitFormButtonAction(authData);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      contentContainerStyle={styles.containerPosition}
      behavior={Platform.OS == "ios" ? "padding" : "position"}
    >
      <Image source={logo} resizeMethod="scale" />
      <Heading title="Sysmap Parrot" subtitle={authFormTitle} />
      {isRegister && (
        <>
          <Input.Root>
            <Input.Icon>
              <IdentificationCard color={THEME.COLORS.GRAY_MEDIUM} />
              <Input.Input
                value={name}
                onChangeText={setName}
                placeholder="Digite seu nome"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </Input.Icon>
          </Input.Root>
          <Spacer />
        </>
      )}
      <Input.Root>
        <Input.Icon>
          <At color={THEME.COLORS.GRAY_MEDIUM} />
          <Input.Input
            value={user}
            onChangeText={setUser}
            placeholder="Digite seu usuário"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </Input.Icon>
      </Input.Root>
      <Spacer />
      <Input.Root>
        <Input.Icon>
          <Lock color={THEME.COLORS.GRAY_MEDIUM} />
          <Input.Input
            value={password}
            onChangeText={setPassword}
            placeholder="Digite sua senha"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry
          />
        </Input.Icon>
      </Input.Root>
      <Spacer />
      <Button
        title={submitFormButtonText}
        onPress={() => {
          handleSubmit();
        }}
      />
      <Spacer />
    </KeyboardAvoidingView>
  );
}

export default AuthForm;
