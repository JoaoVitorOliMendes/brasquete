import { View, Text } from 'react-native'
import React from 'react'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { colors } from '@/constants'

export interface IconConcatProps {
    className?: string,
    icon: keyof typeof Ionicons.glyphMap | keyof typeof MaterialIcons.glyphMap,
    color?: keyof typeof colors,
    size?: number
}

const IconConcat = ({ icon, color = 'black', size = 32, className }: IconConcatProps) => {
    return (
        <>
            {
                (icon in Ionicons.glyphMap) ?
                    <Ionicons name={icon} size={size} color={colors[color]} className={`text-center ${className}`} />
                    :
                    <MaterialIcons name={icon} size={size} color={colors[color]} className={`text-center ${className}`} />
            }
        </>
    )
}

export default IconConcat