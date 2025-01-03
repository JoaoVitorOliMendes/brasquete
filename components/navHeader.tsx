import { View, Text, Pressable, GestureResponderEvent } from 'react-native'
import React from 'react'
import CustomPressIcon, { CustomPressIconProps } from './customPressIcon'

interface NavHeaderProps {
    iconProps: CustomPressIconProps,
    className?: string
}

const NavHeader = ({ iconProps, className }: NavHeaderProps) => {
    return (
        <View className={`py-1 px-4 ${className}`}>
            <Text>
                <CustomPressIcon {...iconProps} size={32} />
            </Text>
        </View>
    )
}

export default NavHeader