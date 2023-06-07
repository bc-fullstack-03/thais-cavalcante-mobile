import { Wind } from "phosphor-react-native";
import { Text, View } from "react-native";
import { THEME } from "../../theme";
import { styles } from "./styles";

interface EmptyStateProps {
  message: string;
}

function EmptyState({ message }: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <Wind size={192} weight="regular" color={THEME.COLORS.GRAY_LIGHT} />
      <Text style={styles.textMd}>{message}</Text>
    </View>
  );
}

export default EmptyState;
