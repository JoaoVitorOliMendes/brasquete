import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const SearchGroupLayout = () => {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name='index'
                options={{
                    title: 'Pesquisar Grupos'
                }}
            />
        </Stack>
    )
}

export default SearchGroupLayout