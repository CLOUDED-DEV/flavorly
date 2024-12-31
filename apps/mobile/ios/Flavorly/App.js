import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { useEffect } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { Asset } from "expo-asset";

import WaitlistJoinScreen from "./screens/WaitlistJoinScreen";

// prevent the splash screen from hiding automatically
SplashScreen.preventAutoHideAsync();

export default function App() {
  useEffect(() => {
    const prepare = async () => {
      try {
        //preload assets
        await Asset.loadAsync([
          require("./assets/flavorly_logo.png"),
          require("./assets/fonts/SofiaSans-Black.ttf"),
          require("./assets/fonts/BlackHanSans-Regular.ttf"),
        ]);
        await new Promise((resolve) => setTimeout(resolve, 2000))
      } catch (e) {
        console.warn(e);
      } finally {
        // hide splash
        await SplashScreen.hideAsync();
      }
    };

    prepare();
  }, []);
  const [fontsLoaded, error] = useFonts({
    "sofiasans-black": require("./assets/fonts/SofiaSans-Black.ttf"),
    "BlackHanSans-Regular": require("./assets/fonts/BlackHanSans-Regular.ttf"),
  });

  // making sure the fonts load
  if (!fontsLoaded || error) {
    return console.log(error);
  }

  let screen = <WaitlistJoinScreen />;

  return <SafeAreaView style={styles.rootContainer}>{screen}</SafeAreaView>;
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: "#F0ECD9",
  },
  logoWrapper: {
    borderWidth: "2",
    alignItems: "center",
    padding: 20,
  },
  logo: {
    height: 125,
    width: 150,
    marginTop: 40,
    borderWidth: "2",
    borderColor: "red",
    resizeMode: "cover",
    position: "absolute",
  },
});
