import { View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'
import NavHeader from '@/components/navHeader'
import { useRouter } from 'expo-router'

const ForgotPass = () => {
    const router = useRouter()

    return (
        <SafeAreaView className='h-full'>
            {router.canGoBack() && <NavHeader iconProps={{ color: 'black', icon: 'arrow-back', onPress: () => router.back() }} />}
            <Text> ForgotPass</Text>
        </SafeAreaView >
    )
}

export default ForgotPass