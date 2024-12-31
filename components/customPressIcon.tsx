import { View, Text, GestureResponderEvent, TouchableOpacity, TouchableHighlight } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { colors } from '@/constants'

export interface CustomPressIconProps {
  className?: string,
  icon: keyof typeof Ionicons.glyphMap,
  onPress?: (event: GestureResponderEvent) => void,
  color?: keyof typeof colors,
  size?: number
}

const CustomPressIcon = ({ className, icon, onPress, color = 'black', size = 24 }: CustomPressIconProps) => {
  return (
    <TouchableOpacity className={`${className} rounded-full p-1`} activeOpacity={0.50} onPress={onPress}>
      <Ionicons name={icon} size={size} color={colors[color]} />
    </TouchableOpacity>
  )
}

export default CustomPressIcon