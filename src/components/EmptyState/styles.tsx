import { StyleSheet } from "react-native";
import { THEME } from "../../theme";

export const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 50,
  },
  textMd: {
    fontSize: THEME.FONT_SIZE.MD,
    fontFamily: THEME.FONT_FAMILY.SEMI_BOLD,
    color: THEME.COLORS.WHITE_ICE,
  },
});
