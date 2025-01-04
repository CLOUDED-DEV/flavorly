import {
  StyleSheet,
  Text,
  View,
  Dimensions,
} from "react-native";
import { StatusBar } from "react-native";
import CTAButton from "../components/ui/CTAButton";

const { width } = Dimensions.get("window");

export default function WaitlistSelectScreen() {
  return (
    <View style={styles.screen}>
      <View style={styles.title}>
        <View style={styles.titleWrapper}>
          <Text
            style={styles.titleWordStyling}
            adjustsFontSizeToFit
            numberOfLines={1}
          >
            How will you use <Text style={styles.blueColor}>Flavorly</Text>?
          </Text>
        </View>
      </View>

      <View style={styles.optionsContainer}>
        <View style={styles.optionCard}>
          <Text style={styles.optionTitle}>Foodie</Text>
          <Text style={styles.optionDescription}>
            Discover and connect with amazing local food experiences
          </Text>
        </View>

        <View style={styles.optionCard}>
          <Text style={styles.optionTitle}>Business</Text>
          <Text style={styles.optionDescription}>
            Grow your food business and connect with customers
          </Text>
        </View>
      </View>

      <StatusBar style="auto" />
      <View style={styles.buttonContainer}>
        <CTAButton 
          title="Continue" 
          onPress={() => console.log('Handle selection')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#f6f3e7',
    paddingTop: 50,
  },
  title: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 60,
    width: "100%",
  },
  titleWrapper: {
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
  blueColor: {
    color: "#43B3AE",
  },
  optionsContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    gap: 20,
  },
  optionCard: {
    width: "100%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 4,
    shadowColor: "black",
    shadowOpacity: 0.1,
    elevation: 4,
  },
  optionTitle: {
    fontSize: 24,
    fontFamily: "BlackHanSans-Regular",
    color: "#1A1110",
    marginBottom: 8,
  },
  optionDescription: {
    fontSize: 16,
    fontFamily: "sofiasans-regular",
    color: "#1A1110",
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    position: "absolute",
    bottom: 60,
    left: 0,
  },
});
