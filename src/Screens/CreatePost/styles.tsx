import { StyleSheet } from "react-native";
import { THEME } from "../../theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  heading: {
    flexDirection: "row",
    alignItems: "center",
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
  textLg: {
    textAlign: "center",
    fontFamily: THEME.FONT_FAMILY.SEMI_BOLD,
    fontSize: THEME.FONT_SIZE.LG,
    color: THEME.COLORS.WHITE,
  },
  buttonsContaier: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  postTypebutton: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 15,
    backgroundColor: THEME.COLORS.CYAN,
    minWidth: 180,
    padding: 12,
    alignItems: "center",
    borderRadius: 12,
  },
  textMd: {
    fontFamily: THEME.FONT_FAMILY.SEMI_BOLD,
    fontSize: THEME.FONT_SIZE.MD,
  },
  postButton: {
    backgroundColor: THEME.COLORS.CYAN,
    padding: 12,
    alignItems: "center",
    borderRadius: 12,
    marginTop: 10,
  },
  disabledPostButton: {
    backgroundColor: THEME.COLORS.GRAY_MEDIUM,
    padding: 12,
    alignItems: "center",
    borderRadius: 12,
    marginTop: 10,
  },
});
