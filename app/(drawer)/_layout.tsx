import { View, Text, Alert, BackHandler, ImageBackground } from 'react-native'
import React, { useContext, useEffect } from 'react'
import Drawer from 'expo-router/drawer'
import { Ionicons } from '@expo/vector-icons'
import { colors, images } from '@/constants'
import DrawerContent from '@/components/drawerContent'
import LogoText from '@/components/logoText'
import CustomButton from '@/components/customButton'
import { useRouter } from 'expo-router'
import { useAuth } from '@/context/AuthContext'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'

const DrawerLayout = () => {
    const router = useRouter()
    const { authState, isLoading } = useAuth()

    if (isLoading) {
        return <Text>Loading...</Text>;
    }

    if (!authState?.authenticated) {
        return (
            <ImageBackground source={images.onboard} className='h-full'>
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

    return (
        <View className='flex-1'>
            <StatusBar backgroundColor={colors.secondary} />
            <Drawer
                screenOptions={{
                    headerShown: false,
                    headerTransparent: true
                }}
                drawerContent={(props) => <DrawerContent {...props} />}
            >
                <Drawer.Screen name='index' options={{
                    title: 'Home',
                    drawerIcon: ({ focused, size }) => (
                        <Ionicons
                            name='home'
                            size={size}
                            color={focused ? colors.black : colors.white}
                        />
                    )
                }} />
                <Drawer.Screen name='groups' options={{
                    title: 'Grupos',
                    drawerIcon: ({ focused, size }) => (
                        <Ionicons
                            name='people'
                            size={size}
                            color={focused ? colors.black : colors.white}
                        />
                    ),
                }} />
                <Drawer.Screen name='matches' options={{
                    title: 'Partidas',
                    drawerIcon: ({ focused, size }) => (
                        <Ionicons
                            name='basketball'
                            size={size}
                            color={focused ? colors.black : colors.white}
                        />
                    ),
                }} />
                <Drawer.Screen name='(profile)' options={{
                    title: 'Perfil',
                    drawerIcon: ({ focused, size }) => (
                        <Ionicons
                            name='person'
                            size={size}
                            color={focused ? colors.black : colors.white}
                        />
                    ),
                }} />
            </Drawer>
        </View>
    )
}

export default DrawerLayout