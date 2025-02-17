import { Slot, SplashScreen, Stack } from 'expo-router';
import 'react-native-reanimated';
import { useFonts } from 'expo-font'
import { useEffect, useState } from 'react';
import React from 'react';
import "../global.css";
import { setCustomText } from 'react-native-global-props';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import { QueryClient, QueryClientProvider } from 'react-query'
import LoadingIndicator from '@/components/loadingIndicator';

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
      })
  )

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
      <QueryClientProvider client={queryClient}>
        <Slot />
        <Toast />
        <LoadingIndicator />
      </QueryClientProvider>
    </GestureHandlerRootView>
  )
}