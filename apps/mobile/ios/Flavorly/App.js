import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import WaitlistJoinScreen from "./screens/WaitlistJoinScreen";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, error] = useFonts({
    "sofia-sans": require("./assets/fonts/SofiaSans-Regular.ttf"),
    "sofia-sans-bold": require("./assets/fonts/SofiaSans-Bold.ttf"),
  });
  
// making sure the fonts load
  useEffect(() => {
    if (fontsLoaded || error) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) {
    return null;
  }

  let screen = <WaitlistJoinScreen/>

  return (
    <SafeAreaView style={styles.container}>{screen}</SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0ECD9",
    alignItems: "center",
    justifyContent: "center",
  },
});
