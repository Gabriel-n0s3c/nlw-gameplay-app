import React, { useCallback, useEffect, useState } from "react";
import { useFonts } from "expo-font";
import { Inter_400Regular, Inter_500Medium } from "@expo-google-fonts/inter";
import {
  Rajdhani_500Medium,
  Rajdhani_700Bold,
} from "@expo-google-fonts/rajdhani";
import { StatusBar, View } from "react-native";
import { Background } from "./src/components/Background";
import { Routes } from "./src/routes";
import * as SplashScreen from "expo-splash-screen";
import { AuthProvider } from "./src/hooks/Auth";
import { GestureHandlerRootView } from "react-native-gesture-handler";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Rajdhani_500Medium,
    Rajdhani_700Bold,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <Background>
        <StatusBar
          backgroundColor="transparent"
          barStyle="light-content"
          translucent
        />
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </Background>
    </GestureHandlerRootView>
  );
}
