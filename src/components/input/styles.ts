import { StyleSheet } from "react-native";
import { THEME } from "../../theme";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    maxWidth: "100%",
    minWidth: 240,
    padding: 12,
    borderRadius: 12,
    backgroundColor: THEME.COLORS.GRAY_DARK,
  },
  input: {
    marginStart: 12,
    flex: 1,
    color: THEME.COLORS.GRAY_MEDIUM,
    fontFamily: THEME.FONT_FAMILY.REGULAR,
  },
});
