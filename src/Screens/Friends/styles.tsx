import { StyleSheet } from "react-native";
import { THEME } from "../../theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileCard: {
    margin: 12,
    gap: 4,
  },
  profileIdentification: {
    flexDirection: "row",
    alignItems: "center",
    marginStart: 12,
  },
  profileNameText: {
    color: THEME.COLORS.WHITE,
    fontFamily: THEME.FONT_FAMILY.BOLD,
    fontSize: THEME.FONT_SIZE.MD,
    marginStart: 8,
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
});
