import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { Asset } from "expo-asset";

import WaitlistJoinScreen from "./screens/WaitlistJoinScreen";

// prevent the splash screen from hiding automatically
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [assetsLoaded, setAssetsLoaded] = useState(false); // state for all page assets to load

  const [fontsLoaded] = useFonts({
    "sofiasans-black": require("./assets/fonts/SofiaSans-Black.ttf"),
    "BlackHanSans-Regular": require("./assets/fonts/BlackHanSans-Regular.ttf"),
    "sofiasans-regular": require("./assets/fonts/SofiaSans-Regular.ttf")
  });

  // preload images
  useEffect(() => {
    const prepare = async () => {
      try {
        await Asset.loadAsync([require("./assets/flavorly_logo.png")]);
        await new Promise((resolve) => setTimeout(resolve, 500)); // set a timer to see splash
        setAssetsLoaded(true); // set asset state to true
      } catch (error) {
        console.warn("Error loading assets: ", error);
      }
    };

    prepare();
  }, []);

  // hide splash when everything has loaded
  useEffect(() => {
    const hideSplash = async () => {
      if (fontsLoaded && assetsLoaded) {
        await SplashScreen.hideAsync();
      }
    };
    hideSplash();
  }, [fontsLoaded, assetsLoaded]);

  // fallback if fonts or assets dont load
  if (!fontsLoaded || !assetsLoaded) {
    return null;
  }

  let screen = <WaitlistJoinScreen />;

  return <SafeAreaView style={styles.rootContainer}>{screen}</SafeAreaView>;
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: "#f6f3e7",
  },
});
