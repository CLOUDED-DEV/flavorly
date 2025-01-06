import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { StatusBar } from "react-native";
import { useState } from "react";
import CTAButton from "../components/ui/CTAButton";
import OptionCardComponent from "../components/ui/OptionCardComponent";

import { Feather } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

export default function WaitlistSelectScreen({ navigation }) {
  const [selectedCard, setSelectedCard] = useState(null);

  const handlePress = (cardIndex) => {
    setSelectedCard(cardIndex);
    console.log("Card number ", cardIndex, "is selected.");
  };

  const handleContinue = () => {
    Alert.alert(
      "Selection required",
      "Please select an option before continuing."
    );
  };

  return (
    <View style={styles.screen}>
      <View style={styles.headerStyle}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={28} color="#1A1110" />
        </TouchableOpacity>
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
            How will you use <Text style={styles.blueColor}>Flavorly</Text>?
          </Text>
        </View>
      </View>

      <View style={styles.optionsContainer}>
        <OptionCardComponent
          title="Foodie"
          description="Discover and connect with amazing local food experiences"
          isSelected={selectedCard === 1} // if selectedCard's value is equal to 1, this returns true which triggers the selected styling
          onPress={() => handlePress(1)}
        />
        <OptionCardComponent
          title="Business"
          description="Grow your food business and connect with customers"
          isSelected={selectedCard === 2} // if selectedCard's value is equal to 2, this returns true which triggers the selected styling
          onPress={() => handlePress(2)}
        />
      </View>

      <StatusBar style="auto" />
      <View style={styles.buttonContainer}>
        <CTAButton title="Continue" onPress={handleContinue} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    position: "relative",
    backgroundColor: "#f6f3e7",
    // paddingTop: 20,
  },
  headerStyle: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
    justifyContent: "space-between",
    marginRight: -5,
  },
  logo: {
    height: 75,
    width: 75,
    resizeMode: "contain",
  },
  title: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 35,
    // paddingTop: 10,
    width: "100%",
  },
  titleWrapper: {
    width: width * 0.95,
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
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    position: "absolute",
    bottom: 60,
    left: 0,
  },
  optionsContainer: {
    flex: 1,
    alignItems: "center",
    top: height * 0.1,
    // bottom: height*1,
    // justifyContent: "space-between",
    paddingHorizontal: 20,
    gap: 70,
  },
});
