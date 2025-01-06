import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { Asset } from "expo-asset";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import WaitlistJoinScreen from "./screens/WaitlistJoinScreen";
import WaitlistSelectScreen from "./screens/WaitlistSelectScreen";
import FoodieSignupScreen from "./screens/FoodieSignupScreen";
import BusinessSignupScreen from "./screens/BusinessSignupScreen";

const Stack = createNativeStackNavigator();

// prevent the splash screen from hiding automatically
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [assetsLoaded, setAssetsLoaded] = useState(false); // state for all page assets to load

  const [fontsLoaded] = useFonts({
    "sofiasans-black": require("./assets/fonts/SofiaSans-Black.ttf"),
    "BlackHanSans-Regular": require("./assets/fonts/BlackHanSans-Regular.ttf"),
    "sofiasans-regular": require("./assets/fonts/SofiaSans-Regular.ttf"),
  });

  // preload images
  useEffect(() => {
    const prepare = async () => {
      try {
        await Asset.loadAsync([require("./assets/flavorly_logo.png")]);
        await new Promise((resolve) => setTimeout(resolve, 1000)); // set a timer to see splash
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

  return (
    <NavigationContainer>
      <SafeAreaView style={styles.rootContainer}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: "#f6f3e7" },
          }}
        >
          <Stack.Screen name="WaitlistJoin" component={WaitlistJoinScreen} />
          <Stack.Screen name="WaitlistSelect" component={WaitlistSelectScreen}/>
          <Stack.Screen name="FoodieSignupScreen" component={FoodieSignupScreen}/>
          <Stack.Screen name="BusinessSignupScreen" component={BusinessSignupScreen}/>
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: "#f6f3e7",
  },
});
