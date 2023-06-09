import { StyleSheet } from "react-native";
import { THEME } from "../../theme";

export const styles = StyleSheet.create({
  container: {
    height: "100%",
    padding: 10,
    display: "flex",
    justifyContent: "space-between",
  },
  logoutContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  textMd: {
    fontSize: THEME.FONT_SIZE.MD,
    fontFamily: THEME.FONT_FAMILY.BOLD,
    color: THEME.COLORS.WHITE,
  },
});
