import { View, Text } from 'react-native'
import React from 'react'
import { Slot, Stack } from 'expo-router'

const MatchDetailsLayout = () => {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name='index'
                options={{
                    title: 'Partidas'
                }}
            />
        </Stack>
    )
}

export default MatchDetailsLayout