import { Slot, SplashScreen, Stack } from 'expo-router';
import 'react-native-reanimated';
import { useFonts } from 'expo-font'
import { useEffect, useState } from 'react';
import React from 'react';
import "../global.css";
import { setCustomText } from 'react-native-global-props';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import LoadingIndicator from '@/components/loadingIndicator';
import { useOnlineManager } from '@/hooks/useOnlineManager';
import { useAppState } from '@/hooks/useAppState';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

SplashScreen.preventAutoHideAsync()

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2
    }
  }
});
export default function RootLayout() {

  useOnlineManager()
  useAppState()

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

  // createGroupEventMetadata()

  return (
    <GestureHandlerRootView>
      <QueryClientProvider client={queryClient}>
        <Slot />
        <Toast />
        <LoadingIndicator />
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </QueryClientProvider>
    </GestureHandlerRootView>
  )
}