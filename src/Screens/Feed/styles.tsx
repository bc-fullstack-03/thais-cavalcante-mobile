import { StyleSheet } from "react-native";
import { THEME } from "../../theme";

export const styles = StyleSheet.create({
  headingContainer: {
    padding: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: THEME.COLORS.GRAY_MEDIUM,
  },
  userContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  createPostButton: {
    backgroundColor: THEME.COLORS.CYAN,
    padding: 12,
    alignItems: "center",
    borderRadius: 12,
  },
  text: {
    fontSize: THEME.FONT_SIZE.LG,
    color: THEME.COLORS.WHITE_ICE,
  },
  loadMorePostButton: {
    display: "flex",
    alignItems: "center",
  },
  loading: {
    marginTop: 100,
    transform: [{ scale: 3 }],
  },
});
