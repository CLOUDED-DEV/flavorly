import {
  StyleSheet,
  Text,
  Dimensions,
  View,
  Image,
  useEffect,
} from "react-native";
import { StatusBar } from "react-native";
import { Feather } from "@expo/vector-icons";
const { width } = Dimensions.get("window");
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
        <View style={styles.titleWrapper}>
          <Text
            style={styles.titleWordStyling}
            adjustsFontSizeToFit
            numberOfLines={1}
          >
            Discover A World of <Text style={styles.blueColor}>Flavor</Text>
          </Text>
        </View>
        <View style={styles.titleWrapper}>
          <Text
            style={styles.titleWordStyling}
            adjustsFontSizeToFit
            numberOfLines={1}
          >
            Made for <Text style={styles.blueColor}>You</Text>
          </Text>
        </View>
      </View>

      <View style={styles.subtext}>
        <View style={styles.subtextWrapper}>
          <Text
            style={styles.subtextStyling}
            adjustsFontSizeToFit
            numberOfLines={1}
          >
            We're thrilled to welcome you to our growing platform!
          </Text>
          <View style={styles.subtextWrapper}>
            <Text style={styles.subtextStyling}>Here's what awaits you:</Text>
          </View>
        </View>
      </View>

      <View style={styles.waitlistWholeContainer}>
        <View style={styles.waitlistSingleContainer}>
          <Feather name="map-pin" size={24} color="#A81C07" />
          <Text style={styles.waitlistContainerTitle}>Explore{"\n"}<Text style={styles.waitlistContainerSubtext}>exciting restaurants and hidden gems near you</Text></Text>
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  logoWrapper: {
    // borderWidth: "2", // to see how big the wrapper is
    alignItems: "center",
    flexDirection: "column",
  },
  logo: {
    height: 125,
    width: 150,
    // borderWidth: "2",
    resizeMode: "cover",
    marginTop: -10,
  },
  title: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    width: "100%",
  },
  subtext: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginTop: 30,
  },
  titleWrapper: {
    width: width * 0.9,
    alignItems: "center",
    justifyContent: "center",
  },
  subtextWrapper: {
    width: width * 0.9,
    alignItems: "center",
    justifyContent: "center",
  },
  titleWordStyling: {
    color: "#1A1110",
    fontSize: 28,
    fontFamily: "BlackHanSans-Regular",
    textAlign: "center",
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 4,
    shadowColor: "black",
    shadowOpacity: 0.35,
  },
  subtextStyling: {
    color: "#1A1110",
    textAlign: "center",
    fontFamily: "sofiasans-regular",
    fontSize: 16,
  },
  blueColor: {
    color: "#43B3AE",
  },
  waitlistWholeContainer: {
    width: "100%",
    marginTop: 40,
    paddingLeft: 10
  },
  waitlistSingleContainer: {
    width: width * 0.95,
    flexDirection: "row",
    alignItems: "center"

  },
  waitlistContainerTitle: {
    fontFamily: "BlackHanSans-Regular",
    fontSize: 36, 
    paddingLeft: 10
  },
  waitlistContainerSubtext:{
    fontFamily: "sofiasans-regular",
    fontSize: 16
  }
});
