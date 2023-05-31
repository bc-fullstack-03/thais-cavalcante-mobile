import { StyleSheet } from "react-native";
import { THEME } from "../../theme";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 32,
  },
  title: {
    color: THEME.COLORS.WHITE_ICE,
    fontSize: THEME.FONT_SIZE.LG,
    textAlign: "center",
    fontFamily: THEME.FONT_FAMILY.BOLD,
  },
  subtitle: {
    color: THEME.COLORS.GRAY_MEDIUM,
    fontSize: THEME.FONT_SIZE.MD,
    textAlign: "center",
    fontFamily: THEME.FONT_FAMILY.REGULAR,
  },
});
