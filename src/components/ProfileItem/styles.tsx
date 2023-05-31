import { StyleSheet } from "react-native";
import { THEME } from "../../theme";

export const styles = StyleSheet.create({
  profileCard: {
    padding: 10,
    gap: 4,
    borderBottomColor: THEME.COLORS.GRAY_MEDIUM,
    borderBottomWidth: 1,
  },
  profileIdentification: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileNameText: {
    color: THEME.COLORS.WHITE,
    fontFamily: THEME.FONT_FAMILY.BOLD,
    fontSize: THEME.FONT_SIZE.LG,
    marginStart: 5,
  },
  followers: {
    color: THEME.COLORS.WHITE,
    fontFamily: THEME.FONT_FAMILY.REGULAR,
    fontSize: THEME.FONT_SIZE.SM,
    marginStart: 8,
  },
  following: {
    color: THEME.COLORS.WHITE,
    fontFamily: THEME.FONT_FAMILY.REGULAR,
    fontSize: THEME.FONT_SIZE.SM,
    marginStart: 8,
  },
  button: {
    backgroundColor: THEME.COLORS.CYAN,
    padding: 12,
    alignItems: "center",
    borderRadius: 12,
    marginTop: 10,
  },
  disabledButton: {
    backgroundColor: THEME.COLORS.GRAY_MEDIUM,
    padding: 12,
    alignItems: "center",
    borderRadius: 12,
    marginTop: 10,
  },
});
