import { Slot, SplashScreen, Stack } from 'expo-router';
import 'react-native-reanimated';
import { useFonts } from 'expo-font'
import { useEffect } from 'react';
import React from 'react';
import "../global.css";
import { setCustomText } from 'react-native-global-props';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import Toast from 'react-native-toast-message';

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    'Roboto': require('../assets/fonts/Roboto-Medium.ttf'),
    'Anton': require('../assets/fonts/Anton-Regular.ttf')
  })

  useEffect(() => {
    if (error) throw error
    if (fontsLoaded) SplashScreen.hideAsync()
  }, [fontsLoaded, error])

  if (!fontsLoaded && !error) return null

  const customTextGlobalProps = {
    style: {
      fontFamily: 'Roboto'
    }
  }

  setCustomText(customTextGlobalProps)

  return (
    <GestureHandlerRootView>
      <Slot />
      <Toast />
    </GestureHandlerRootView>
  )
}