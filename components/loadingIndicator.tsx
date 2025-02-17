import { View, Text, ActivityIndicatorProps, Modal } from 'react-native'
import React from 'react'
import { ActivityIndicator } from 'react-native'
import { colors } from '@/constants'
import { useIsFetching } from 'react-query'

interface LoadingIndicatorProps {
    indicatorProps?: ActivityIndicatorProps,
    className?: string
}

const LoadingIndicator = ({ indicatorProps, className }: LoadingIndicatorProps) => {
  const isFetching = useIsFetching()
  return (
    <Modal transparent visible={isFetching > 0}>
      <View className={`w-full h-full flex justify-center items-center ${className}`}>
        <ActivityIndicator size={72} color={colors.primary} {...indicatorProps} />
      </View>
    </Modal>
  )
}

export default LoadingIndicator