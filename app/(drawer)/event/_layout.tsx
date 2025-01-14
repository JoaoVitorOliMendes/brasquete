import { View, Text } from 'react-native'
import React from 'react'
import { Slot, Stack } from 'expo-router'
import Drawer from 'expo-router/drawer'
import { StatusBar } from 'expo-status-bar'

const EventsLayout = () => {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name='index'
                options={{
                    title: 'Eventos'
                }}
            />
        </Stack>
    )
}

export default EventsLayout