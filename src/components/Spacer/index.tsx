import React, { ReactNode } from "react";
import { View } from "react-native";

import { styles } from "./styles";

interface SpacerProps {
  children?: ReactNode;
}

function Spacer({ children }: SpacerProps) {
  return <View style={styles.container}>{children}</View>;
}

export default Spacer;
