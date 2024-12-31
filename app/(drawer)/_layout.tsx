import { View, Text } from 'react-native'
import React from 'react'
import Drawer from 'expo-router/drawer'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons'
import { colors } from '../../constants'
import DrawerContent from '@/components/drawerContent'

const DrawerLayout = () => {
    return (
        <GestureHandlerRootView className='flex-1'>
            <Drawer
                drawerContent={(props) => <DrawerContent {...props} />}
            >
                <Drawer.Screen name='home' options={{
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
                    title: 'Pesquisar Grupos',
                    drawerIcon: ({ focused, size }) => (
                        <Ionicons
                            name='search'
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