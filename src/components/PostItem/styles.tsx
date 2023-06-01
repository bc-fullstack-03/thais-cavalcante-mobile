import { StyleSheet } from "react-native";
import { THEME } from "../../theme";

export const styles = StyleSheet.create({
  postContainer: {
    borderBottomWidth: 1,
    borderBottomColor: THEME.COLORS.GRAY_MEDIUM,
  },
  postDataContainer: {
    padding: 10,
    display: "flex",
    flexDirection: "row",
    gap: 5,
  },
  postContentContainer: {
    width: "80%",
  },
  imageContainer: {
    width: "100%",
  },
  image: {
    resizeMode: "cover",
    height: 240,
    borderRadius: 12,
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
});
