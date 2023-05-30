import React, { ReactNode } from "react";
import { Image, KeyboardAvoidingView, Platform } from "react-native";

import { styles } from "./styles";
import Heading from "../Heading";
import { Input } from "../input";
import { Envelope, Lock } from "phosphor-react-native";
import Spacer from "../Spacer";
import { THEME } from "../../theme";
import Button from "../Button";
import logo from "../../assets/logo.png";

interface AuthFormProps {
  authFormTitle: string;
  submitFormButtonText: string;
}

function AuthForm({ authFormTitle, submitFormButtonText }: AuthFormProps) {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      contentContainerStyle={styles.containerPosition}
      behavior={Platform.OS == "ios" ? "padding" : "position"}
    >
      <Image source={logo} resizeMethod="scale" />
      <Heading title="Sysmap Parrot" subtitle={authFormTitle} />
      <Input.Root>
        <Input.Icon>
          <Envelope color={THEME.COLORS.INPUT} />
          <Input.Input placeholder="Digite seu e-mail" autoCapitalize="none" />
        </Input.Icon>
      </Input.Root>
      <Spacer />
      <Input.Root>
        <Input.Icon>
          <Lock color={THEME.COLORS.INPUT} />
          <Input.Input
            placeholder="Digite sua senha"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry
          />
        </Input.Icon>
      </Input.Root>
      <Spacer />
      <Button title={submitFormButtonText} onPress={() => {}} />
      <Spacer />
    </KeyboardAvoidingView>
  );
}

export default AuthForm;
