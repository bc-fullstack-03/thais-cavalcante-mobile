import { StyleSheet } from "react-native";
import { THEME } from "../../theme";

export const styles = StyleSheet.create({
  link: {
    color: THEME.COLORS.GRAY_MEDIUM,
    fontSize: THEME.FONT_SIZE.SM,
    textAlign: "center",
    fontFamily: THEME.FONT_FAMILY.REGULAR,
    textDecorationLine: "underline",
  },
  error: {
    color: THEME.COLORS.RED,
    textAlign: "center",
  },
});
