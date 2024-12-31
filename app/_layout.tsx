import { Slot, SplashScreen, Stack } from 'expo-router';
import 'react-native-reanimated';
import { useFonts } from 'expo-font'
import { useEffect } from 'react';
import React from 'react';
import "../global.css";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

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

  return (
    <GestureHandlerRootView>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name='(auth)' />
        <Stack.Screen name='index' />
      </Stack>
    </GestureHandlerRootView>
  )
}