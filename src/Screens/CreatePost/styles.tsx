import { StyleSheet } from "react-native";
import { THEME } from "../../theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 12,
  },
  heading: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingBottom: 12,
    borderBottomColor: THEME.COLORS.GRAY_MEDIUM,
    borderBottomWidth: 1,
  },
  userNameText: {
    fontFamily: THEME.FONT_FAMILY.REGULAR,
    fontSize: THEME.FONT_SIZE.MD,
    color: THEME.COLORS.WHITE,
    margin: 12,
  },
  text: {
    textAlign: "center",
    fontFamily: THEME.FONT_FAMILY.SEMI_BOLD,
    fontSize: THEME.FONT_SIZE.LG,
    color: THEME.COLORS.WHITE,
  },
});
