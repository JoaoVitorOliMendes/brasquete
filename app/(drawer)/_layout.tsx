import { View, Text, Alert, BackHandler, ImageBackground, SafeAreaView } from 'react-native'
import React, { useContext, useEffect } from 'react'
import Drawer from 'expo-router/drawer'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons'
import { colors, images } from '@/constants'
import DrawerContent from '@/components/drawerContent'
import LogoText from '@/components/logoText'
import CustomButton from '@/components/customButton'
import { useRouter } from 'expo-router'
import { AuthContext, useAuth } from '@/context/AuthContext'
import CustomDrawerHeader from '@/components/customDrawerHeader'

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
        <GestureHandlerRootView className='flex-1'>
            <Drawer
                screenOptions={{
                    headerTitle: '',
                    header: CustomDrawerHeader,
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
                    title: 'Histórico de Partidas',
                    drawerIcon: ({ focused, size }) => (
                        <Ionicons
                            name='time'
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
        </GestureHandlerRootView>
    )
}

export default DrawerLayout