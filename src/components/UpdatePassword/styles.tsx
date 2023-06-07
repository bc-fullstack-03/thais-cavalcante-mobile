import { StyleSheet } from "react-native";
import { THEME } from "../../theme";

export const styles = StyleSheet.create({
  textLg: {
    fontSize: THEME.FONT_SIZE.LG,
    fontFamily: THEME.FONT_FAMILY.BOLD,
    color: THEME.COLORS.WHITE,
    marginTop: 15,
    marginBottom: 5,
  },
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
