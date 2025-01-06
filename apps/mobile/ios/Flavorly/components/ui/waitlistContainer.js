import { StyleSheet, Text, View, Dimensions } from "react-native";
import { Feather } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function WaitlistContainer({
  iconName,
  title,
  subtext,
  iconColor = "#A81C07",
}) {
  return (
    <View style={styles.waitlistWholeContainer}>
      <View style={styles.waitlistSingleContainer}>
        <Feather name={iconName} size={20} color={iconColor} />
        <Text style={styles.waitlistContainerTitle}>
          {title}
          {"\n"}
          <Text style={styles.waitlistContainerSubtext}>{subtext}</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  waitlistWholeContainer: {
    width: "100%",
    marginTop: 40,
    paddingLeft: 10,
  },
  waitlistSingleContainer: {
    width: width * 0.95,
    flexDirection: "row",
    alignItems: "center",
  },
  waitlistContainerTitle: {
    fontFamily: "BlackHanSans-Regular",
    fontSize: 36,
    paddingLeft: 10,
  },
  waitlistContainerSubtext: {
    fontFamily: "sofiasans-regular",
    fontSize: 16,
  },
});
