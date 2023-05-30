import React, { ReactNode } from "react";
import { TextInput, TextInputProps, View } from "react-native";

import { styles } from "./styles";
import { THEME } from "../../theme";

interface TextInputRootProps {
  children: ReactNode;
}

function TextInputRoot({ children }: TextInputRootProps) {
  return <View style={styles.container}>{children}</View>;
}

interface TextInputInputProps extends TextInputProps {}

function TextInputInput(props: TextInputInputProps) {
  return (
    <TextInput
      style={styles.input}
      {...props}
      placeholderTextColor={THEME.COLORS.INPUT}
    ></TextInput>
  );
}

interface TextInputIconProps {
  children: ReactNode;
}

function TextInputIcon({ children }: TextInputIconProps) {
  return <>{children}</>;
}

export const Input = {
  Root: TextInputRoot,
  Input: TextInputInput,
  Icon: TextInputIcon,
};
