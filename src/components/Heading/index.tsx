import React from "react";
import { View, Text, ViewProps } from "react-native";

import { styles } from "./styles";

interface HeadingProps extends ViewProps {
  title: string;
  subtitle: string;
}

function Heading({ title, subtitle }: HeadingProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

export default Heading;
