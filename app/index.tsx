import CustomButton from '@/components/customButton';
import { images } from '@/constants';
import { useRouter } from 'expo-router';
import React from 'react';
import { ImageBackground, View } from 'react-native';
import 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { setCustomText } from 'react-native-global-props'
import LogoText from '@/components/logoText';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const router = useRouter()
  const customTextGlobalProps = {
    style: {
      fontFamily: 'Roboto'
    }
  }

  setCustomText(customTextGlobalProps)

  return (
    <>
      <ImageBackground source={images.onboard} className='h-full'>
        <SafeAreaView className='h-full p-5 flex flex-col justify-between'>
          <LogoText />
          <View className='mb-10'>
            <CustomButton color='primary' type='filled' label='Entrar' className='w-full mb-2' onPress={() => router.push('/login')} />
            <CustomButton color='primary' type='outline' label='Criar Nova Conta' className='w-full' onPress={() => router.push('/register')} />
          </View>
        </SafeAreaView>
      </ImageBackground>
      <StatusBar translucent backgroundColor='transparent' />
    </>
  )
}