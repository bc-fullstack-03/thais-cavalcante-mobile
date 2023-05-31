import { StyleSheet } from "react-native";
import { THEME } from "../../theme";

export const styles = StyleSheet.create({
  userContainer: {
    padding: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    borderBottomWidth: 1,
    borderBottomColor: THEME.COLORS.GRAY_MEDIUM,
  },
  text: {
    fontSize: THEME.FONT_SIZE.LG,
    color: THEME.COLORS.WHITE_ICE,
  },
});
