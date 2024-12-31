import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from "expo-status-bar";

const AuthLayout = () => {
    return (
        <>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="login" />
                <Stack.Screen name="register" />
                <Stack.Screen name="forgotPass" />
            </Stack>
            {/* <Loader isLoading={loading} /> */}
        </>
    )
}

export default AuthLayout