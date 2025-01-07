import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  Dimensions,
} from "react-native";
import CTAButton from "../components/ui/CTAButton";

import { Feather } from "@expo/vector-icons";
const { width, height } = Dimensions.get("window");

export default function BusinessSignupScreen({ navigation }) {
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
      <StatusBar style="auto" />
      <View style={styles.buttonContainer}>
        <CTAButton title="Submit" onPress={()=> {console.log("Business submit")}} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    position: "relative",
    backgroundColor: "#f6f3e7",
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
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    position: "absolute",
    bottom: 60,
    left: 0,
  },
});
