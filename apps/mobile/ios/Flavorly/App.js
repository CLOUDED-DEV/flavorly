import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { StyleSheet, Text, View } from "react-native";
import { useEffect } from "react";
import { useFonts } from "expo-font";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, error] = useFonts({
    "sofia-sans": require("./assets/fonts/SofiaSans-Regular.ttf"),
    "sofia-sans-bold": require("./assets/fonts/SofiaSans-Bold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded || error) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={{fontFamily: "sofia-sans"}}>This text is using 'Sofia Sans'!</Text>
      <StatusBar style="auto" />
    </View>
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
