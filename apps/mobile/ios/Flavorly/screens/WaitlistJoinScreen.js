import {
  StyleSheet,
  Text,
  Dimensions,
  View,
  SafeAreaView,
  Image,
  useEffect,
} from "react-native";
import { StatusBar } from "react-native";
const {width} = Dimensions.get('window')
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
        <View style={styles.subtextWrapper}>
          <Text style={styles.subtextStyling}> We're thrilled to welcome you to our growing platform!{"\n"}Here's what awaits you:</Text>
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
    marginTop: -10
  },
  title: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    width: '100%',
  },
  titleWrapper: {
    width: width * 0.9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subtextWrapper:{
    alignItems: "center",
    justifyContent: "center",
  },
  titleWordStyling: {
    color: "#1A1110",
    fontSize: 26,
    fontFamily: "BlackHanSans-Regular",
    textAlign: "center",
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 4,
    shadowColor: "black",
    shadowOpacity: 0.35
  },
  subtextStyling: {
    color: "#1A1110",
    textAlign: "center",
    fontFamily: "sofiasans-regular",
    marginTop: 30
  },
  blueColor: {
    color: "#43B3AE",
  },
});
