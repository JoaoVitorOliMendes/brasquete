import { View, Text, Image } from 'react-native'
import React from 'react'
import { images } from '@/constants'

interface LogoTextProps {
    className?: string
}

const LogoText = ({ className }: LogoTextProps) => {
    return (
        <View className={`flex flex-row justify-start items-center gap-3 ${className !== undefined ? className : ''}`}>
            <View>
                <Text className='!font-Anton text-5xl leading-relaxed'>BRASQUETE</Text>
            </View>
            <Image source={images.logo} style={{ width: 50, height: 50 }} />
        </View>
    )
}

export default LogoText