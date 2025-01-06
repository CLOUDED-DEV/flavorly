import { StyleSheet, Text, Dimensions, View, Image } from "react-native";
import { StatusBar } from "react-native";
import WaitlistContainer from "../components/ui/waitlistContainer";
import CTAButton from "../components/ui/CTAButton";
const { width } = Dimensions.get("window");
export default function WaitlistJoinScreen({ navigation }) {
  return (
    <View style={styles.screen}>
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

      <WaitlistContainer
        iconName="map-pin"
        title="Explore"
        subtext="exciting restaurants and hidden gems near you"
      />
      <WaitlistContainer
        iconName="share-2"
        title="Share"
        subtext="your experiences with an expanding community"
        iconColor="#43B3AE"
      />
      <WaitlistContainer
        iconName="users"
        title="Connect"
        subtext="with food lovers and creators"
        iconColor="#FE7F2D"
      />
      <StatusBar style="auto" />
      <View style={styles.buttonContainer}>
        <CTAButton
          title="Join the Waitlist!"
          onPress={() => navigation.navigate("WaitlistSelect")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    position: "relative",
  },
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
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    position: "absolute",
    bottom: 60,
    left: 0,
  },
});
