import { StyleSheet } from "react-native";
import { THEME } from "../../theme";

export const styles = StyleSheet.create({
  commentContainer: {
    borderBottomWidth: 1,
    borderBottomColor: THEME.COLORS.GRAY_MEDIUM,
  },
  commentDataContainer: {
    padding: 10,
    display: "flex",
    flexDirection: "row",
    gap: 5,
  },
  commentContentContainer: {
    width: "75%",
  },
  textLg: {
    fontSize: THEME.FONT_SIZE.LG,
    fontFamily: THEME.FONT_FAMILY.BOLD,
    color: THEME.COLORS.WHITE,
    marginTop: 15,
    marginBottom: 5,
  },
  textMd: {
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
  footer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingVertical: 10,
  },
  trash: {
    marginTop: 15,
  },
});
