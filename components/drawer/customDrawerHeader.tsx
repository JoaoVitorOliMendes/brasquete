import { View, Text } from 'react-native'
import React from 'react'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import CustomPressIcon from '../buttons/customPressIcon'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from 'expo-router'
import { ParamListBase } from '@react-navigation/native'
import CustomTitle from '../customTitle'

interface CustomDrawerHeaderProps {
    title?: string
}
const CustomDrawerHeader = ({ title }: CustomDrawerHeaderProps) => {
    const navigation = useNavigation<DrawerNavigationProp<ParamListBase>>();

    return (
        <SafeAreaView
            className='p-4 bg-secondary flex flex-row flex-wrap justify-center items-center relative'
        >
            <Text className='absolute left-2'>
                <CustomPressIcon iconProps={{ icon: 'menu', size: 32, color: 'white' }} onPress={() => {
                    navigation.openDrawer()
                }} />
            </Text>
            <CustomTitle title={title ?? ''} color='white' sizeClass='text-2xl' />
        </SafeAreaView>
    )
}

export default CustomDrawerHeader