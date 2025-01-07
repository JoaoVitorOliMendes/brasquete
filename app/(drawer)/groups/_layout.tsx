import { View, Text } from 'react-native'
import React from 'react'
import { Slot, Stack } from 'expo-router'

const GroupDetailsLayout = () => {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name='index'
                options={{
                    title: 'Grupos'
                }}
            />
        </Stack>
    )
}

export default GroupDetailsLayout