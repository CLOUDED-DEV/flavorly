import { StyleSheet, Text, View, SafeAreaView, Animated } from "react-native";
import { useEffect, useState, useRef } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import LottieView from "lottie-react-native";
import { Asset } from "expo-asset";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import WaitlistJoinScreen from "./screens/WaitlistJoinScreen";
import WaitlistSelectScreen from "./screens/WaitlistSelectScreen";
import FoodieSignupScreen from "./screens/FoodieSignupScreen";
import BusinessSignupScreen from "./screens/BusinessSignupScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [showLottie, setShowLottie] = useState(true);
  const animationRef = useRef(null);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const [fontsLoaded] = useFonts({
    "sofiasans-black": require("./assets/fonts/SofiaSans-Black.ttf"),
    "BlackHanSans-Regular": require("./assets/fonts/BlackHanSans-Regular.ttf"),
    "sofiasans-regular": require("./assets/fonts/SofiaSans-Regular.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load assets
        await Asset.loadAsync([require("./assets/flavorly_logo.png")]);
        
        // Wait for fonts
        if (!fontsLoaded) {
          await new Promise(resolve => {
            const checkFonts = setInterval(() => {
              if (fontsLoaded) {
                clearInterval(checkFonts);
                resolve();
              }
            }, 100);
          });
        }

        // Mark app as ready to show Lottie animation
        setAppIsReady(true);
        
        // Hide the native splash screen only after our Lottie view is ready
        await SplashScreen.hideAsync();
      } catch (e) {
        console.warn(e);
      }
    }

    prepare();
  }, [fontsLoaded]);

  // Handle smooth transition
  useEffect(() => {
    if (appIsReady) {
      const timer = setTimeout(() => {
        // Start fade out animation
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 800, // Smooth fade out over 800ms
          useNativeDriver: true,
        }).start(() => {
          setShowLottie(false);
        });
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [appIsReady, fadeAnim]);

  if (!fontsLoaded || !appIsReady || showLottie) {
    return (
      <Animated.View style={[styles.lottieContainer, { opacity: fadeAnim }]}>
        <LottieView
          ref={animationRef}
          source={require("./assets/loadingScreen.json")}
          autoPlay
          loop={true}
          style={styles.lottie}
        />
      </Animated.View>
    );
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
          <Stack.Screen
            name="WaitlistSelect"
            component={WaitlistSelectScreen}
          />
          <Stack.Screen
            name="FoodieSignupScreen"
            component={FoodieSignupScreen}
          />
          <Stack.Screen
            name="BusinessSignupScreen"
            component={BusinessSignupScreen}
          />
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
  lottieContainer: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f6f3e7",
    zIndex: 999,
  },
  lottie: {
    width: '100%',
    height: '100%',
  },
});
