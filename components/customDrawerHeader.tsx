import { View, Text } from 'react-native'
import React from 'react'
import { DrawerHeaderProps, DrawerNavigationProp } from '@react-navigation/drawer'
import NavHeader from './navHeader'
import CustomPressIcon from './customPressIcon'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from 'expo-router'
import { ParamListBase } from '@react-navigation/native'

const CustomDrawerHeader = () => {
    const navigation = useNavigation<DrawerNavigationProp<ParamListBase>>();

    return (
        <SafeAreaView
            className='p-4 bg-secondary'
        >
            <Text>
                <CustomPressIcon icon='menu' size={32} color='white' onPress={() => {
                    navigation.openDrawer()
                }} />
            </Text>
        </SafeAreaView>
    )
}

export default CustomDrawerHeader