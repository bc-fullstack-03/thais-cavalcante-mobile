import React from "react";
import { View, Text } from "react-native";

import { styles } from "./styles";

function Loading() {
  return (
    <View style={styles.container}>
      <Text>Loading...</Text>
    </View>
  );
}

export default Loading;
