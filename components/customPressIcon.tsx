import { View, Text, GestureResponderEvent, TouchableOpacity, TouchableHighlight } from 'react-native'
import React from 'react'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { colors } from '@/constants'

export interface CustomPressIconProps {
  className?: string,
  icon: keyof typeof Ionicons.glyphMap | keyof typeof MaterialIcons.glyphMap,
  onPress?: (event: GestureResponderEvent) => void,
  color?: keyof typeof colors,
  size?: number
}

const CustomPressIcon = ({ className, icon, onPress, color = 'black', size = 24 }: CustomPressIconProps) => {
  return (
    <TouchableOpacity className={`rounded-full p-1 flex justify-center align-center z-10 ${className}`} activeOpacity={0.50} onPress={onPress}>
      {
        (icon in Ionicons.glyphMap) ?
        <Ionicons name={icon} size={size} color={colors[color]} className='text-center' />
        :
        <MaterialIcons name={icon} size={size} color={colors[color]} className='text-center' />
      }
    </TouchableOpacity>
  )
}

export default CustomPressIcon