import { View, Text } from 'react-native'
import React from 'react'
import { DrawerHeaderProps } from '@react-navigation/drawer'
import NavHeader from './navHeader'
import CustomPressIcon from './customPressIcon'
import { SafeAreaView } from 'react-native-safe-area-context'

const CustomDrawerHeader = ({ layout, navigation, options, route }: DrawerHeaderProps) => {
    
    return (
        <SafeAreaView
            className='p-4 bg-secondary'
        >
            <CustomPressIcon icon='menu' size={32} color='white' onPress={() => {
                navigation.openDrawer()
            }} />
        </SafeAreaView>
    )
}

export default CustomDrawerHeader