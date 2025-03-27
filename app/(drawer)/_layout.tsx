import { View, Text, StatusBar } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Drawer from 'expo-router/drawer'
import { Ionicons } from '@expo/vector-icons'
import { colors } from '@/constants'
import DrawerContent from '@/components/drawer/drawerContent'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Platform } from 'react-native';
import { fetchUser } from '@/api/authApi';
import { upsertExpoToken } from '@/api/profileApi';
import { Profiles } from '@/model/models';
import { useMutation, useQuery } from '@tanstack/react-query'

const DrawerLayout = () => {
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
                <Drawer.Screen name='event' options={{
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