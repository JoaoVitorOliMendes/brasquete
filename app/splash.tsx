import { View, Text, ImageBackground, TextInput } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context'
import LogoText from '@/components/logoText'
import CustomButton from '@/components/buttons/customButton'
import { images } from '@/constants'
import { useRouter } from 'expo-router'

const Index = () => {
    const router = useRouter()

    return (
        <ImageBackground source={images.onboard} className='h-full'>
            <StatusBar translucent backgroundColor='transparent' />
            <StatusBar translucent backgroundColor='transparent' />
            <SafeAreaView className='h-full p-5 flex flex-col justify-between'>
                <LogoText />
                <View className='mb-10'>
                    <CustomButton color='primary' type='filled' label='Entrar' className='w-full mb-2' onPress={() => router.push('/login')} />
                    <CustomButton color='primary' type='outline' label='Criar Nova Conta' className='w-full' onPress={() => router.push('/register')} />
                </View>
            </SafeAreaView>
        </ImageBackground>
    )
}

export default Index