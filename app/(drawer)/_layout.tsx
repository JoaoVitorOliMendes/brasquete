import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import Drawer from 'expo-router/drawer'
import { Ionicons } from '@expo/vector-icons'
import { colors } from '@/constants'
import DrawerContent from '@/components/drawerContent'
import { Redirect, useRouter } from 'expo-router'
import { useAuth } from '@/context/AuthContext'
import { SafeAreaView } from 'react-native-safe-area-context'
import LoadingIndicator from '@/components/loadingIndicator'

const DrawerLayout = () => {
    const router = useRouter()
    const { authState, isLoading } = useAuth()

    if (isLoading) {
        return <LoadingIndicator />;
    }

    if (!isLoading && !authState?.authenticated) {
        return <Redirect href='/splash' />
    }

    return (
        <SafeAreaView className='flex-1 flex flex-row justify-start items-start'>
            <StatusBar backgroundColor={colors.secondary} />
            <Drawer
                screenOptions={{
                    header: () => null,
                    headerShown: false,
                    swipeEdgeWidth: 0
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
                <Drawer.Screen name='searchGroup' options={{
                    title: 'Pesquisar Grupos',
                    drawerIcon: ({ focused, size }) => (
                        <Ionicons
                            name='search'
                            size={size}
                            color={focused ? colors.black : colors.white}
                        />
                    ),
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
        </SafeAreaView>
    )
}

export default DrawerLayout