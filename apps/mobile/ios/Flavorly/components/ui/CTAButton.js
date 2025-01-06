import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

export default function CTAButton({ title, onPress, style }) {
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#1A1110",
    width: width * 0.9,
    paddingVertical: 15,
    borderRadius: 15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 4,
    shadowColor: "black",
    shadowOpacity: 0.25,
    elevation: 4,
  },
  buttonText: {
    color: "#f6f3e7",
    textAlign: "center",
    fontSize: 22,
    fontFamily: "BlackHanSans-Regular",
    letterSpacing: 1,
  },
});
