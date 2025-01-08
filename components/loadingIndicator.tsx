import { View, Text, ActivityIndicatorProps } from 'react-native'
import React from 'react'
import { ActivityIndicator } from 'react-native'
import { colors } from '@/constants'

interface LoadingIndicatorProps {
    indicatorProps?: ActivityIndicatorProps,
    className?: string
}

const LoadingIndicator = ({ indicatorProps, className }: LoadingIndicatorProps) => {
  return (
    <View className={`w-full h-full flex justify-center items-center ${className}`}>
      <ActivityIndicator size={72} color={colors.primary} {...indicatorProps} />
    </View>
  )
}

export default LoadingIndicator