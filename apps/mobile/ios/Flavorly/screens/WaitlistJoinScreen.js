import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  useEffect,
} from "react-native";
import { StatusBar } from "react-native";

export default function WaitlistJoinScreen() {
  return (
    <View>
      <View style={styles.logoWrapper}>
        <Image
          source={require("../assets/flavorly_logo.png")}
          style={styles.logo}
        />
      </View>
      <View style={styles.title}>
        <Text style={styles.darkBrownColor}>
          Discover A World of <Text style={styles.blueColor}>Flavor</Text>{" "}
          {"\n"}Made for <Text style={styles.blueColor}>You</Text>
        </Text>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  logoWrapper: {
    // borderWidth: "2", to see how big the wrapper is
    alignItems: "center",
    flexDirection: "column",
  },
  logo: {
    height: 125,
    width: 150,
    // borderWidth: "2",
    resizeMode: "cover",
  },
  title: {
    color: "#1A1110",
    fontSize: 26,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    // borderWidth: 2,
    // flexDirection: "column",
  },
  darkBrownColor: {
    color: "#1A1110",
    fontSize: 26,
    fontFamily: "BlackHanSans-Regular",
    textAlign: "center",
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 4,
    shadowColor: "black",
    shadowOpacity: 0.35
  },
  blueColor: {
    color: "#43B3AE",
  },
});
