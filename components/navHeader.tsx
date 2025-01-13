import { View, Text, Pressable, GestureResponderEvent } from 'react-native'
import React from 'react'
import CustomPressIcon, { CustomPressIconProps } from './customPressIcon'
import CustomTitle from './customTitle'

interface NavHeaderProps {
    iconProps: CustomPressIconProps,
    className?: string,
    title?: string
}

const NavHeader = ({ iconProps, className, title }: NavHeaderProps) => {
    return (
        <View className={`p-4 flex flex-row flex-wrap justify-center items-center relative ${className}`}>
            <Text className='absolute left-2'>
                <CustomPressIcon {...iconProps} size={32} />
            </Text>
            <CustomTitle title={title || ''} color='white' sizeClass='text-2xl' />
        </View>
    )
}

export default NavHeader