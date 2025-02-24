import React, { useEffect } from "react";
import { SplashScreen, Stack } from "expo-router";
import "./global.css";
import { useFonts } from "expo-font";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded] = useFonts({
    "WorkSans-Bold": require("../assets/fonts/WorkSans-Bold.ttf"),
    "WorkSans-Light": require("../assets/fonts/WorkSans-Light.ttf"),
    "WorkSans-Regular": require("../assets/fonts/WorkSans-Regular.ttf"),
    "WorkSans-SemiBold": require("../assets/fonts/WorkSans-SemiBold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="auth" />
      <Stack.Screen name="(drawer)" />
    </Stack>
  );
};

export default RootLayout;
