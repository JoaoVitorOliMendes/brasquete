import { View, Text, GestureResponderEvent, TouchableOpacity, TouchableHighlight } from 'react-native'
import React from 'react'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { colors } from '@/constants'
import IconConcat, { IconConcatProps } from '../iconConcat'

export interface CustomPressIconProps {
  className?: string,
  onPress?: (event: GestureResponderEvent) => void,
  iconProps: IconConcatProps
}

const CustomPressIcon = ({ className, iconProps, onPress }: CustomPressIconProps) => {
  return (
    <TouchableOpacity className={`rounded-full p-1 flex justify-center align-center ${className}`} activeOpacity={0.50} onPress={onPress}>
      <IconConcat {...iconProps} />
    </TouchableOpacity>
  )
}

export default CustomPressIcon