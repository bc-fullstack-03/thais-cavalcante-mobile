import { StyleSheet } from "react-native";
import { THEME } from "../../theme";

export const styles = StyleSheet.create({
  textMd: {
    textAlign: "center",
    fontSize: THEME.FONT_SIZE.MD,
    fontFamily: THEME.FONT_FAMILY.SEMI_BOLD,
    color: THEME.COLORS.WHITE_ICE,
    marginBottom: 5,
  },
  textSm: {
    fontSize: THEME.FONT_SIZE.SM,
    color: THEME.COLORS.WHITE_ICE,
    marginBottom: 5,
  },
});
